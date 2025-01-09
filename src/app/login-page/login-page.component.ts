import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {RegisterComponent} from './register/register.component';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {filter} from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    CommonModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class LoginPageComponent implements OnInit {
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
