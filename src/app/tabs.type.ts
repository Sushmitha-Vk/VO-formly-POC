import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyModule } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-tabs',
  standalone: true,
  imports: [
    MatTabsModule,
    ReactiveFormsModule,
    FormlyModule,
    MatButtonModule,
    CommonModule,
    FlexLayoutModule
  ],
  template: `
    <mat-tab-group>
      @for(tab of field.fieldGroup; track tab; let i = $index; let last =
      $last){
      <mat-tab
        [label]="tab?.props?.label || ''"
        *ngIf="isHidden(tab?.props?.attributes) || true"
        [disabled]="
          i !== 0 && !isValid(field.fieldGroup ? field.fieldGroup[i - 1] : {})
        "
      >
        <formly-field [field]="tab"></formly-field>
        @if (last) {
        <div fxLayout="row" fxLayoutAlign="space-around center">
          <button
            mat-flat-button
            color="primary"
            [disabled]="!form.valid"
            *ngIf="!model.id"
            type="submit"
          >
            Submit
          </button>
          <button
            mat-flat-button
            color="primary"
            (click)="onApprove()"
            *ngIf="model.id"
            type="button"
          >
            Approve
          </button>
          <button
            mat-flat-button
            color="primary"
            (click)="onReject()"
            *ngIf="model.id"
            type="button"
          >
            Reject
          </button>
        </div>
        }
      </mat-tab>
      }
    </mat-tab-group>
  `,
})
export class FormlyFieldTabs extends FieldType {
  submittedData!: any[];
  isValid(field: FormlyFieldConfig): boolean {
    if (field.key) {
      return field?.formControl?.valid || false;
    }
    
    return field.fieldGroup
      ? field.fieldGroup.every((f: any) => this.isValid(f))
      : true;
  }

  isHidden(attributes: any): boolean {
    // console.log('---this.mod--', this.model)
    // console.log('---this--', this)

    // if(attributes && attributes.hide) {
    //   console.log('----hide---', attributes.hide)
    //   const expression = Function(`"use strict";return ${attributes.hide}`)();
    //   console.log('---exp--', expression)
    // }
    return true;
  }

  onApprove() {
    this.submittedData = JSON.parse(
      localStorage.getItem('submittedData') || '[]'
    );
    const index = this.submittedData.findIndex(
      (item) => item.id == this.model.id
    );
    this.submittedData[index].status = 'Approved';
    localStorage.setItem('submittedData', JSON.stringify(this.submittedData));
  }

  onReject() {
    this.submittedData = JSON.parse(
      localStorage.getItem('submittedData') || '[]'
    );
    const index = this.submittedData.findIndex(
      (item) => item.id == this.model.id
    );
    this.submittedData[index].status = 'Rejected';
    localStorage.setItem('submittedData', JSON.stringify(this.submittedData));
  }
}
