import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

enum Status {
  Submitted, Approved, Rejected
}
export interface InboxContent {
  _id: string,
  formData: any,
  status: Status
}

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule,
    MatButtonModule, ToolbarComponent, CommonModule
  ],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class InboxComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'accountNumber', 'panNo', 'status', 'action'];
  dataSource: MatTableDataSource<InboxContent> = new MatTableDataSource([<InboxContent>{
    _id: '',
    formData: {},
    status: Status.Submitted
  }]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private apiServide: ApiService) {
    // const formData = JSON.parse(localStorage.getItem('submittedData') || '[]');
    this.apiServide.getAllSubmittedData().subscribe(data=> {
      this.dataSource = new MatTableDataSource(data.data);
    })
    // this.dataSource = new MatTableDataSource(formData);
    // constructor(private translate: TranslateService) {
    // }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reviewAndApprove(id: any) {
    this.router.navigate(['/approval-form'], {
      queryParams: {id}
    });
  }
}
