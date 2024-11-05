import { Routes } from '@angular/router';

import {LoginPageComponent} from './login-page/login-page.component';
import {MainPageComponent} from './main-page/main-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: LoginPageComponent },
  { path: 'main', component: MainPageComponent },  // Neue Route
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
