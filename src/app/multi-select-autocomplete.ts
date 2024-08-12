import { Component, computed, inject, model, OnInit, signal } from "@angular/core";
import { FieldType } from "@ngx-formly/material";
import { FieldTypeConfig } from "@ngx-formly/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
      [formControl]="formControl"
      [formlyAttributes]="field"
    >
      @for (chip of chipsArr(); track $index) {
      <mat-chip-row (removed)="removeChip(chip)">
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

  removeChip(chip: string): void {
    this.chipsArr.update((element) => {
      const index = element.indexOf(chip);
      if (index >= 0) {
        element.splice(index, 1);
        this.announcer.announce(`Removed ${chip}`);
      }
      return [...element];
    });
  }

  selectedChip(event: MatAutocompleteSelectedEvent): void {
    const selectedValue = event.option.viewValue;
    if (!this.chipsArr().includes(selectedValue)) {
      this.chipsArr.update((element) => [...element, selectedValue]);
    }
    this.currentState.set("");
    event.option.deselect();
  }

}
