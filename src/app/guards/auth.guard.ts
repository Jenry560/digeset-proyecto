import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si no hay token, redirige al login
  if (!authService.getToken()) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
