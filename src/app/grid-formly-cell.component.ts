import { Component } from '@angular/core';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'formly-ag-grid-cell',
  standalone: true,
  imports: [FormlyModule],
  template: ` <formly-field [field]="getField()"></formly-field> `,
})
export class GridFormlyCellComponent implements ICellRendererAngularComp {
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  getField(): FormlyFieldConfig {
    const rowIndex = this.params.rowIndex;
    const prop = this.params.colDef.field;
    const parentField = this.params.context.parentField;

    return parentField.get([rowIndex, prop]);
  }
}