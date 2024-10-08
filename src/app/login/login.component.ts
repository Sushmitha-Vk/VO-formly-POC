import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

// import { AuthService } from /auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MatProgressSpinnerModule, MatButtonModule,
    FlexLayoutModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  // encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm: any;

  error: any;

  isLoading = false;

  passwordType: any;

  showIcon: any;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    localStorage.removeItem('loggedInUser');
    this.buildForm();
    this.passwordType = "password";
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.isLoading = false;
      localStorage.setItem('loggedInUser', JSON.stringify({role: 'Approver', ...data}));
      this.router.navigate(['/inbox']);
    } else {
      this.error = 'Login failed due to invalid credentials';
      this.isLoading = false;
    }
  }

  onChange() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.showIcon = true;
    } else {
      this.passwordType = 'password';
      this.showIcon = false;
    }
  }

}

