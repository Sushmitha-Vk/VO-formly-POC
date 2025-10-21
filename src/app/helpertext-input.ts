import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  FieldTypeConfig,
  FormlyFieldConfig,
  FormlyModule,
} from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'mu-helper-text',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    FormlyModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  template: `
    <div class="helper-text-container">
      <!-- Helper Mode - Show toggle and conditional content -->
      <div *ngIf="to['enableHelper']">
        <mat-label>{{ to.label }}</mat-label>
        <div *ngIf="originalValue" class="flex-row">
          <span class="answer">{{ originalValue }}</span>
          <mat-slide-toggle
            [(ngModel)]="checked"
            (toggleChange)="toggleSlide()"
            [disabled]="field.form?.disabled || false"
            >{{ helperLabel }}</mat-slide-toggle
          >
        </div>

        <mat-form-field class="textarea" appearance="outline" *ngIf="checked">
          <textarea
            matInput
            [formControl]="helperFormControl"
            [readonly]="readonly || field.form?.disabled"
            [disabled]="field.form?.disabled||false"
          >
          </textarea>
        </mat-form-field>
      </div>

      <!-- Default Mode - Show field directly -->
      <div *ngIf="!to['enableHelper']">
        <formly-field *ngIf="defaultFieldConfig" [field]="defaultFieldConfig">
        </formly-field>
      </div>
    </div>
  `,
  styles: `
     .helper-text-container{
      display: flex;
      flex-direction: column;
     }
     .answer{
      font-size: 12px;
     }
      .textarea{
      margin: 0px !important;
      width: 100%;
     }
     .flex-row{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
     }
     .w-full{
      width: 100%;
     }
  `,
})
export class MnlFormHelperTextInputComponent
  extends FieldType<FieldTypeConfig>
  implements OnInit
{
  checked = false;
  helperFormControl!: FormControl; // Separate form control for helper model

  get helperLabel() {
    return this.to['helperProps']?.['helperLabel'] || 'Need help?';
  }
  get defaultHelperText() {
    return this.to['helperProps']?.['defaultHelperText'] || '';
  }

  // Get value from primary model (answers)
  get originalValue() {
    const fieldKey = this.field.key as string;
    return this.field.model?.[fieldKey];
  }

  // Get/Set value from secondary model (helper)
  get helperModel() {
    return (
      this.to['helperModel'] ||
      this.props['helperModel'] ||
      this.options?.formState?.['helperModel']
    );
  }

  get helperKey() {
    return this.to['helperKey'] || this.field.key;
  }

  get currentHelperValue() {
    if (this.helperModel && this.helperKey) {
      return this.helperModel[this.helperKey as string];
    }
    return '';
  }

  set currentHelperValue(value: any) {
    if (this.helperModel && this.helperKey) {
      this.helperModel[this.helperKey as string] = value;
    }
  }

  get readonly() {
    return this.to['readonly'] || this.props['readonly'] || false;
  }

  defaultFieldConfig?: FormlyFieldConfig;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    // Initialize helper form control with value from helper model
    this.helperFormControl = new FormControl(this.currentHelperValue || '');

    // Subscribe to changes in helper form control and update helper model
    this.helperFormControl.valueChanges.subscribe((value) => {
      this.currentHelperValue = value;
      // Emit helper model change to parent component
      this.options?.formState?.['onHelperModelChange']?.(this.helperModel);
    });

    this.setupDefaultField();

    if (this.to['enableHelper']) {
      this.setCorrectValue();
      this.determineInitialState();
    }
    if (this.currentHelperValue && this.currentHelperValue.trim() !== '') {
      this.checked = true;
    }
  }

  toggleSlide() {
    this.checked = !this.checked;
    if (this.checked) {
      // When toggle is opened, check if helper field is empty
      const currenthelper = this.helperFormControl.value;
      if (!currenthelper || currenthelper.trim() === '') {
        this.helperFormControl.setValue(this.defaultHelperText);
      }
    } else {
      this.helperFormControl.setValue('');
    }
    this.cdr.detectChanges();
  }

  setupDefaultField() {
    const fieldConfig = this.to['defaultFieldConfig'];
    if (fieldConfig) {
      // Get current value from model and sync with formControl
      const fieldKey = this.field.key as string;
      const modelValue = this.field.model?.[fieldKey];
      
      // Sync formControl value with model value if it exists
      if (modelValue !== undefined && modelValue !== null) {
        this.formControl.setValue(modelValue, { emitEvent: false });
      }
      
      // Create enhanced props with necessary fixes for production
      const enhancedProps = {
        ...fieldConfig.props,
      };
      
      // For select fields, add compareWith function to ensure proper value matching in production builds
      if (fieldConfig.type === 'select' && !enhancedProps['compareWith']) {
        enhancedProps['compareWith'] = (o1: any, o2: any) => o1 === o2;
      }
      
      this.defaultFieldConfig = {
        type: fieldConfig.type,
        key: this.field.key || fieldConfig.key || 'defaultKey',
        formControl: this.formControl,
        props: enhancedProps,
        wrappers: fieldConfig.wrappers || [],
        modelOptions: fieldConfig.modelOptions || this.field.modelOptions || {},
        validators: fieldConfig.validators || this.field.validators || {},
        asyncValidators:
          fieldConfig.asyncValidators || this.field.asyncValidators || {},
        hooks: fieldConfig.hooks || this.field.hooks || {},
        expressions: fieldConfig.expressions || this.field.expressions || {},
        hide: fieldConfig.hide !== undefined ? fieldConfig.hide : false,
        className: fieldConfig.className || this.field.className || '',
        fieldGroupClassName:
          fieldConfig.fieldGroupClassName ||
          this.field.fieldGroupClassName ||
          '',
        parent: this.field.parent,
        options: this.field.options,
        model: this.field.model,
        form: this.field.form,
      };
    }
  }

  determineInitialState() {
    // Auto-open helper based on scoring criteria
    switch (this.to['scoring']?.['criteria']) {
      case 'exactMatch':
        if (
          Array.isArray(this.to['scoring']?.['answer']) &&
          !this.to['scoring']?.['answer'].includes(this.originalValue)
        ) {
          this.checked = true;
        }
        break;

      case 'range':
        const answer = this.originalValue;
        const num = typeof answer === 'number' ? answer : Number(answer);

        const correct =
          Number.isFinite(num) &&
          num >= this.to['scoring']?.['answer'].min &&
          num <= this.to['scoring']?.['answer'].max;

        if (!correct) {
          this.checked = true;
        }
        break;
    }
  }

  setCorrectValue() {
    const currentHelperValue = this.currentHelperValue;

    // If helper already has a value (user edited), don't override
    if (currentHelperValue && currentHelperValue.trim() !== '') {
      return;
    }

    switch (this.to['scoring']?.['criteria']) {
      case 'attempted':
        // For attempted, set defaultHelperText
        this.helperFormControl.setValue('');
        break;

      case 'exactMatch':
        if (Array.isArray(this.to['scoring']?.['answer'])) {
          if (this.to['scoring']?.['answer'].includes(this.originalValue)) {
            // Answer is correct - set empty value in helper
            this.helperFormControl.setValue('');
          } else {
            // Answer is incorrect - set defaultHelperText in helper
            this.helperFormControl.setValue(this.defaultHelperText);
          }
        }
        break;

      case 'range':
        const answer = this.originalValue;
        const num = typeof answer === 'number' ? answer : Number(answer);

        const correct =
          Number.isFinite(num) &&
          num >= this.to['scoring']?.['answer'].min &&
          num <= this.to['scoring']?.['answer'].max;

        if (correct) {
          // Answer is correct - set empty value in helper
          this.helperFormControl.setValue('');
        } else {
          // Answer is incorrect - set defaultHelperText in helper
          this.helperFormControl.setValue(this.defaultHelperText);
        }
        break;

      default:
        break;
    }
  }
}
