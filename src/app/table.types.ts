import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldArrayType, FieldType, FormlyModule } from '@ngx-formly/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
    selector: 'selector-name',
    standalone: true,
    imports: [
        MatTableModule,
        FormlyMaterialModule,
        FormlyModule,
        MatSortModule,
        MatPaginatorModule
    ],
    template: `
        
        <table mat-table [dataSource]="data" matSort class="mat-elevation-z8">
        @for (column of displayedColumns; track column) {
            <ng-container [matColumnDef]="column">
            <th mat-header-cell mat-sort-header *matHeaderCellDef> {{column}} </th>
            <td mat-cell *matCellDef="let element"> {{element[column]}} </td>
            </ng-container>
        }

        <tr mat-header-row *matHeaderRowDef="columnsToDisplay"></tr>
        <tr mat-row *matRowDef="let row; columns: columnsToDisplay;"></tr>
        </table>
        <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" aria-label="Select page of users"></mat-paginator>
    `
})

export class FormlyFieldTable extends FieldArrayType implements OnInit {
    displayedColumns: string[] = [];
    columnsToDisplay: string[] = [];
    data = new MatTableDataSource([]);
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.data.paginator = this.paginator;

    this.data.sort = this.sort;
  }
  
    ngOnInit() {
        this.data = new MatTableDataSource(this.field.props['gridOptions']?.data);
        this.displayedColumns = this.field.props['gridOptions']?.columnDefs;
        this.columnsToDisplay =  this.displayedColumns.slice();
      }
}