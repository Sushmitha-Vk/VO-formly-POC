import { Component, OnInit } from "@angular/core";
import { FieldType } from "@ngx-formly/material";
import { FieldTypeConfig } from "@ngx-formly/core";
import { Observable } from "rxjs";
import { startWith, switchMap } from "rxjs/operators";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { AsyncPipe } from "@angular/common";
import { FormlyModule } from "@ngx-formly/core";

@Component({
  selector: "formly-autocomplete-type",
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    FormlyModule,
  ],
  template: `
    <input
      matInput
      [matAutocomplete]="auto"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [placeholder]="props.placeholder || ''"
      [errorStateMatcher]="errorStateMatcher"
    />
    <mat-autocomplete #auto="matAutocomplete">
      @for (value of filter | async; track value) {
      <mat-option [value]="value">{{ value }}</mat-option>
      }
    </mat-autocomplete>
  `,
})
export class AutocompleteTypeComponent extends FieldType<FieldTypeConfig>
  implements OnInit {
  filter!: Observable<any>;
  ngOnInit() {
    this.filter = this.formControl.valueChanges.pipe(
      startWith(""),
      switchMap((term) => this.props?.["filter"](term))
    );
  }
}
