import { inject } from "@angular/core";
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { AuthStore } from "@app/features/auth/store/auth.store";

export const guestGuard: CanActivateFn = (): boolean | UrlTree => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  authStore.hydrate();
  if (authStore.isAuthenticated()) {
    return router.createUrlTree(['/feed']);
  }
  return true;
};
