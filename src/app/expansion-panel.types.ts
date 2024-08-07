import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldType, FormlyField, FormlyFieldConfig, FormlyFieldProps, FormlyForm, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

@Component({
    selector: 'formly-field-expansion-panel',
    standalone: true,
    styleUrl: './expansion-panel.types.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatFormFieldModule,
        MatExpansionModule,
        MatIconModule,
        FormlyMaterialModule,
        FormlyModule,
        CommonModule
    ],
    template: `<mat-accordion class="example-headers-align" multi>
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title> {{field?.props?.label}} </mat-panel-title>
        <mat-panel-description>
          {{field?.props?.description ?? ''}}
          <!-- <mat-icon>account_circle</mat-icon> -->
        </mat-panel-description>
      </mat-expansion-panel-header>

      <formly-field [field]="field?.fieldGroup[0]"></formly-field>
    </mat-expansion-panel>
    </mat-accordion>`
})

export class FormlyFieldExpansionPanel extends FieldType {
    override field : any= {};
    isValid(field: FormlyFieldConfig): boolean {
      if (field.key) {
        return field?.formControl?.valid || true;
      }
  
      return field.fieldGroup ? field.fieldGroup.every((f) => this.isValid(f)) : true;
    }
  }