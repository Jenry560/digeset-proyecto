import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si hay token, redirige hacia la pagina principal
  if (authService.getToken()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
