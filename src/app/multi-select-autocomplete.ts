import { Component, computed, inject, model, OnInit, signal } from "@angular/core";
import { FieldType } from "@ngx-formly/material";
import { FieldTypeConfig } from "@ngx-formly/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { AsyncPipe } from "@angular/common";
import { FormlyModule } from "@ngx-formly/core";
import { MatChipsModule } from "@angular/material/chips";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatIconModule } from "@angular/material/icon";

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
    MatChipsModule,
    MatIconModule,
  ],
  template: `
    <mat-chip-grid
      #chipGrid
      [formControl]="itemControl"
      [formlyAttributes]="field"
    >
      @for (chip of formControl.value; track $index; let i= $index) {
      <mat-chip-row (removed)="removeChip(i)">
        {{ chip }}
        <button matChipRemove [attr.aria-label]="'remove ' + chip">
          <mat-icon>cancel</mat-icon>
        </button>
      </mat-chip-row>
      }
    </mat-chip-grid>
    <input
      [(ngModel)]="currentState"
      [matChipInputFor]="chipGrid"
      [matAutocomplete]="auto"
    />
    <mat-autocomplete
      #auto="matAutocomplete"
      (optionSelected)="selectedChip($event)"
    >
      @for (state of filteredStates(); track state) {
      <mat-option [value]="state">{{ state }}</mat-option>
      }
    </mat-autocomplete>
  `,
})
export class MultiSelectAutocompleteComponent extends FieldType<FieldTypeConfig>
  implements OnInit {
  readonly currentState = model("");
  readonly chipsArr = signal<string[]>([]);
  readonly announcer = inject(LiveAnnouncer);
  tempArr: any;
  itemControl = new FormControl();

  readonly filteredStates = computed(() => {
    const currentState = this.currentState().toLowerCase();
    this.tempArr = this.props.options;
    return currentState
        ? this.tempArr?.filter((state: any) =>
            state.toLowerCase().includes(currentState)
        )
        : this.tempArr?.slice();
    });

  ngOnInit() {}

  removeChip(i:any): void {
    const value = this.formControl.value;    
    this.formControl.setValue([
      ...value.slice(0, i),
      ...value.slice(i + 1, value.length)
    ]);
    this.formControl.markAsTouched()    
  }

  selectedChip(event: MatAutocompleteSelectedEvent): void {
    const data =  [
      ...this.itemControl.value,
      event.option.viewValue,
    ]
    this.formControl.setValue([...new Set(data)]);
    this.itemControl.setValue("");
    this.currentState.set("");
  }

}
