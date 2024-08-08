import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approver-form',
  standalone: true,
  imports: [],
  templateUrl: './approver-form.component.html',
  styleUrl: './approver-form.component.scss'
})
export class ApproverFormComponent {
  isLoading = false;

  constructor(private router: Router) {}

  onLogOut() {
    this.isLoading = true;
    // setTimeout(() => {
      this.router.navigate(['/login']);
    // }, 1000)
    localStorage.removeItem('loggedInUser');
  }
}
