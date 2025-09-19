import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
        <div *ngIf="to['value']" class="flex-row">
          <span class="answer">Answer: {{ to['value'] }}</span>
          <mat-slide-toggle
            [(ngModel)]="checked"
            (toggleChange)="toggleSlide()"
            >{{ to['helperLabel'] }}</mat-slide-toggle
          >
        </div>

        <mat-form-field class="textarea" appearance="outline" *ngIf="checked">
          <textarea
            matInput
            [formControl]="formControl"
            [formlyAttributes]="field"
            [readonly]="to['readonly']"
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
  defaultFieldConfig?: FormlyFieldConfig;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.setupDefaultField();

    // If mode is helper, set up the initial state based on scoring
    if (this.to['enableHelper']) {
        this.setCorrectValue();
      this.determineInitialState();
    }
  }

  toggleSlide() {
    this.checked = !this.checked;
    this.cdr.detectChanges();
  }

  setupDefaultField() {
    const fieldConfig = this.to['defaultFieldConfig'];
    if (fieldConfig) {
      this.defaultFieldConfig = {
        ...fieldConfig,
        key: this.field.key || fieldConfig.key || 'defaultKey',
        formControl: this.formControl,
        // Add required properties that formly expects
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
        // Inherit parent field's form and model
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
          !this.to['scoring']?.['answer'].includes(this.to['value'])
        ) {
          this.checked = true;
        }
        break;

      case 'range':
        const answer = this.to['value'];
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
    switch (this.to['scoring']?.['criteria']) {
      case 'attempted':
        this.formControl?.setValue(this.to['value']);
        break;

      case 'exactMatch':
        if (
          Array.isArray(this.to['scoring']?.['answer']) &&
          !this.to['scoring']?.['answer'].includes(this.to['value'])
        ) {
          this.formControl?.setValue(this.to['scoring']['answer'].join(', '));
        }
        break;

      case 'range':
        const answer = this.to['value'];
        const num = typeof answer === 'number' ? answer : Number(answer);

        const correct =
          Number.isFinite(num) &&
          num >= this.to['scoring']?.['answer'].min &&
          num <= this.to['scoring']?.['answer'].max;

        if (!correct) {
          this.formControl?.setValue(
            `Value must be in range of ${this.to['scoring']?.['answer'].min} & ${this.to['scoring']?.['answer'].max}`
          );
        }
        break;

        default:
            this.formControl?.setValue(this.to['value']);
        break;
    }
  }
}
