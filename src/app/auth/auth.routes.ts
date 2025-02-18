import { Routes } from '@angular/router';
import {AuthComponent} from './auth.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,  // Hier wird der AuthComponent als Container geladen
    children: [
      {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent),
      },
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      }
    ]
  }
];
