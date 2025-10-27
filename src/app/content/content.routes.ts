import { Routes } from '@angular/router';
import {ContentComponent} from './content.component';

export const contentRoutes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: 'main-page',
        loadComponent: () => import('./main-page/main-page.component').then(c => c.MainPageComponent),
      },
      {
        path: 'post',
        loadComponent: () => import('./post/post.component').then(c => c.PostComponent),
      },
      {
        path: 'posts',
        loadComponent: () => import('./posts/posts.component').then(c => c.PostsComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings.component').then(c => c.SettingsComponent),
      },
      {
        path: 'form-signals',
        loadComponent: () => import('./form-signals/form-signals.component').then(c => c.FormSignalsComponent),
      },
      { path: '', redirectTo: 'main-page', pathMatch: 'full' }
    ]
  }
];
