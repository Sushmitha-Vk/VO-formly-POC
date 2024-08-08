import { Routes } from '@angular/router';
import { VendorOnboardingComponent } from './vendor-onboarding/vendor-onboarding.component';
import { authGuard } from './auth.guard';
import { ApproverFormComponent } from './approver-form/approver-form.component';
import { LoginComponent } from './login/login.component';
import { InboxComponent } from './inbox/inbox.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'approval-form',
        component: ApproverFormComponent,
        canActivate: [authGuard] 
    },
    {
        path: 'inbox',
        component: InboxComponent,
        canActivate: [authGuard] 
    },
    {
        path: 'vendor-onboarding',
        component: VendorOnboardingComponent
    }
];
