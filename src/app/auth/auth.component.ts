import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {RegisterComponent} from './register/register.component';

import {LoginComponent} from './login/login.component';
import {filter} from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { UserControllerService } from '../openapi-client';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    HttpClientModule
],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class AuthComponent implements OnInit {
  isLoginMode = true;

  constructor(private router: Router) {
    this.setModeBasedOnUrl(this.router.url);
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.setModeBasedOnUrl(event.url);
    });
  }

  setModeBasedOnUrl(url: string) {
    this.isLoginMode = url.includes('/login');
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.router.navigate([this.isLoginMode ? '/login' : '/register']);
  }
}
