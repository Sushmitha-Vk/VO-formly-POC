import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit{
  badgeCount: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
      this.badgeCount = JSON.parse(localStorage.getItem('submittedData') || '[]').filter((data: any) => data.status === 'Submitted').length;
  }
  onLogOut() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login'])
  }
}
