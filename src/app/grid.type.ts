import { Component, OnInit } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';
import { FirstDataRenderedEvent, GridOptions, ColDef } from 'ag-grid-community';
import { GridFormlyCellComponent } from './grid-formly-cell.component';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';


@Component({
  selector: 'formly-field-grid',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  template: `
    <div [ngStyle]="style" >
      <ag-grid-angular
        style="width: 100%; height: 100%"
        class="className"
        [gridOptions]="gridOptions"
        [rowData]="model"
         [rowHeight]="80"
        (firstDataRendered)="onFirstDataRendered($event)"
      >
      </ag-grid-angular>
    </div>
  `,
})
export class GridTypeComponent extends FieldArrayType implements OnInit {
  gridOptions!: GridOptions;
  style: any = {};

  ngOnInit() {
    this.style = {
      width: this.props?.['width'],
      height: this.props?.['height'],
    };

    // map cell Renderer to Formly Component
    // map cell Renderer to Formly Component
      this.props['gridOptions'].columnDefs.forEach((column: ColDef) => {
      column.cellRenderer = GridFormlyCellComponent;
    });

    // set grid options and context of the parent formly field
    const gridOptions: GridOptions = this.props['gridOptions'] || {};
    gridOptions.context = {
      parentField: this.field,
    };

    this.gridOptions = gridOptions;
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }
}