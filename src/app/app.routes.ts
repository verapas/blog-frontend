import { Routes } from '@angular/router';
import {ContentComponent} from './content/content.component';
import {authGuard} from './guards/auth.guard';


export const routes: Routes = [
  // Default-Route
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  // Auth-Routen (Login, Register)
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
  },
  // Content-Routen (nur für authentifizierte Benutzer mit Rolle USER oder ADMIN)
  {
    path: 'content',
    loadChildren: () => import('./content/content.routes').then(m => m.contentRoutes),
    canActivate: [authGuard],
    data: { roles: ['USER', 'ADMIN'] }
  },
  // Fallback
  { path: '**', redirectTo: 'auth/login' }
];

