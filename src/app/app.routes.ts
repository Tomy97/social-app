import { Routes } from '@angular/router';
import { authGuard } from './core/guards/authGuard.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login').then(m => m.Login)
    },
    {
        canActivate: [authGuard],
        path: 'feed',
        loadComponent: () => import('./features/feed/pages/feed/feed').then(m => m.Feed)
    },
    {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
    }
];
