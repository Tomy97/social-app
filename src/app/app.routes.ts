import { Routes } from '@angular/router';
import { authGuard } from './core/guards/authGuard.guard';
import { guestGuard } from './core/guards/guestGuard.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/pages/login/login').then((m) => m.Login),
  },
  {
    path: 'feed',
    canActivate: [authGuard],
    loadComponent: () => import('./features/feed/pages/feed/feed').then((m) => m.Feed),
  }
];
