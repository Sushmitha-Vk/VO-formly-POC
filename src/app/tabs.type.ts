import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyModule } from '@ngx-formly/core';


@Component({
  selector: 'formly-field-tabs',
  standalone: true,
  imports:[MatTabsModule,ReactiveFormsModule,FormlyModule, MatButtonModule],
  template: `
    <mat-tab-group>
      @for(tab of field.fieldGroup; track tab; let i = $index; let last = $last){
        <mat-tab 
        [label]="tab?.props?.label || ''"
        [disabled]="i !== 0 && !isValid(field.fieldGroup ? field.fieldGroup[i - 1]:{})">
            <formly-field [field]="tab"></formly-field>
            @if (last) {
                <button mat-flat-button color="primary" [disabled]="!form.valid" type="submit">Submit</button>
            }
        </mat-tab>
      }
       
    </mat-tab-group>
  `,
})
export class FormlyFieldTabs extends FieldType {
  isValid(field: FormlyFieldConfig ): boolean {
    if (field.key) {
      return field?.formControl?.valid || false;
    }

    return field.fieldGroup ? field.fieldGroup.every((f: any) => this.isValid(f)) : true;
  }
}


