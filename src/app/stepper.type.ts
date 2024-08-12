import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatStepperModule } from "@angular/material/stepper";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { FieldType, FormlyFieldConfig, FormlyModule } from "@ngx-formly/core";
@Component({
  selector: "formly-field-stepper",
  standalone: true,
  imports: [ MatStepperModule, FormlyModule, FlexLayoutModule, MatButtonModule ],
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
          <button
            mat-flat-button
            color="primary"
            [disabled]="!form.valid"
            type="submit"
          >
            Submit
          </button>
        }
        </div>
      </mat-step>
    }
    </mat-horizontal-stepper>
  `,
})
export class FormlyFieldStepper extends FieldType {
  isValid(field: FormlyFieldConfig): boolean {
    if (field.key) {
      return field?.formControl?.valid ?? false;
    }
    return field.fieldGroup
      ? field.fieldGroup.every((f) => this.isValid(f))
      : true;
  }
}
