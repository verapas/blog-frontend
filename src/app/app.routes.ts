import { Routes } from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {LoginPageComponent} from './login-page/login-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'main', component: MainPageComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' } // Standard auf Login-Seite umleiten
];
