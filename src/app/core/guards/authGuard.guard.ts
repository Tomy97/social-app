import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthStore } from '@features/auth/store/auth.store';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  authStore.hydrate();
  if (!authStore.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }
  return true;
};
