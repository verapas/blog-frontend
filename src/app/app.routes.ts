import { Routes } from '@angular/router';

import {LoginPageComponent} from './login-page/login-page.component';
import {MainPageComponent} from './main-page/main-page.component';
import {ProfileComponent} from './profile/profile.component';
import {TemplatesComponent} from './templates/templates.component';
import {PostsComponent} from './posts/posts.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: LoginPageComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'templates', component: TemplatesComponent },
  { path: 'posts', component: PostsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
