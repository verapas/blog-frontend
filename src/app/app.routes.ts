import { Routes } from '@angular/router';

import {LoginPageComponent} from './login-page/login-page.component';
import {MainPageComponent} from './content/main-page/main-page.component';
import {ProfileComponent} from './content/profile/profile.component';
import {TemplatesComponent} from './content/templates/templates.component';
import {PostsComponent} from './content/posts/posts.component';
import {ContentComponent} from './content/content.component';
import {SettingsComponent} from './content/settings/settings.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: LoginPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: ContentComponent,
    children: [
      { path: 'main', component: MainPageComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'templates', component: TemplatesComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  },
  { path: '**', redirectTo: '/login' }
];

