import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatStepperModule } from "@angular/material/stepper";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { FieldType, FormlyFieldConfig, FormlyModule } from "@ngx-formly/core";
import { ApiService } from "./api.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
@Component({
  selector: "formly-field-stepper",
  standalone: true,
  imports: [ MatStepperModule, FormlyModule, FlexLayoutModule, MatButtonModule, CommonModule ],
  template: `
    <mat-horizontal-stepper>
    @for(step of field.fieldGroup; track step; let index = $index; let last =
        $last){
      <mat-step>
        <ng-template matStepLabel>{{ step?.props?.label }}</ng-template>
        <formly-field [field]="step"></formly-field>
        <div>
        @if (index !== 0) {
          <button
            mat-flat-button
            color="primary"
            matStepperPrevious
            type="button"
          >
            Back
          </button>
        }
        @if (!last) {
          <button
            matStepperNext
            mat-flat-button
            color="primary"
            type="button"
            [disabled]="!isValid(step)"
          >
            Next
          </button>
        }
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
        </div>
      </mat-step>
    }
    </mat-horizontal-stepper>
  `,
})
export class FormlyFieldStepper extends FieldType {
  apiService = inject(ApiService);
  router = inject(Router);

  isValid(field: FormlyFieldConfig): boolean {
    if (field.key) {
      return field?.formControl?.valid ?? false;
    }
    return field.fieldGroup
      ? field.fieldGroup.every((f) => this.isValid(f))
      : true;
  }

  onApprove() {
    this.apiService.updateData(this.model.id, {file: '', formData: this.model, status: 'Approved'}).subscribe(d=> {
       this.router.navigate(['/inbox']);
     });
   }
 
   onReject() {
     this.apiService.updateData(this.model.id, {file: '', formData: this.model, status: 'Rejected'}).subscribe(d=> {
       this.router.navigate(['/inbox']);
     });
   }
}
