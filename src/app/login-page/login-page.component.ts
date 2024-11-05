import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {RegisterComponent} from './register/register.component';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';

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

export class LoginPageComponent {

  isLoginMode = true;

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

}
