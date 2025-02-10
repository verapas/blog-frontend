import { Routes } from '@angular/router';
import {ContentComponent} from './content/content.component';

// todo die childrouten in seperate route files verlegen und admin roles hinzufügen
export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login-page/login-page.component').then(m => m.LoginPageComponent) },
  { path: 'register', loadComponent: () => import('./login-page/login-page.component').then(m => m.LoginPageComponent) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: ContentComponent,
    children: [
      { path: 'main', loadComponent: () => import('./content/main-page/main-page.component').then(m => m.MainPageComponent) },
      { path: 'profile', loadComponent: () => import('./content/profile/profile.component').then(m => m.ProfileComponent) },
      { path: 'post', loadComponent: () => import('./content/post/post.component').then(m => m.PostComponent) },
      { path: 'posts', loadComponent: () => import('./content/posts/posts.component').then(m => m.PostsComponent) },
      { path: 'settings', loadComponent: () => import('./content/settings/settings.component').then(m => m.SettingsComponent) },
    ]
  },
  { path: '**', redirectTo: '/login' }
];
