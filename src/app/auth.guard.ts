import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  if (user && user.role === 'Approver') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
  // return true;
};
