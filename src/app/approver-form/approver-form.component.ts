import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { VendorOnboardingComponent } from '../vendor-onboarding/vendor-onboarding.component';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-approver-form',
  standalone: true,
  imports: [VendorOnboardingComponent, ToolbarComponent, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './approver-form.component.html',
  styleUrl: './approver-form.component.scss'
})
export class ApproverFormComponent implements OnInit {
  isLoading = false;
  vendorId: any;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.route.queryParams.subscribe((data: any) => this.vendorId = data.id);
  }
 
}
