import {Component, inject, signal} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {form, required, minLength, Control} from '@angular/forms/signals';
import {UserControllerService} from '../../openapi-client';
import {CookieService} from 'ngx-cookie-service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, Control, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userControllerService = inject(UserControllerService);
  router = inject(Router);
  cookieService = inject(CookieService);
  errorMessage: string | null = null;

  // Datenmodell als signal
  loginData = signal({
    email: '',
    password: ''
  });

  // Signal Form mit Validierung
  loginForm = form(this.loginData, (path) => {
    minLength(path.password, 8, { message: 'Passwort muss mindestens 8 Zeichen lang sein.' });
  });

  onSubmit() {
    this.errorMessage = null;

    if (!this.loginForm().valid()) {
      this.errorMessage = 'Bitte fülle alle Felder korrekt aus.';
      return;
    }

    const formData = this.loginForm().value();

    this.userControllerService.login({
      email: formData.email,
      password: formData.password,
    }).subscribe({
      next: (response) => {
        if (response.token) {
          this.cookieService.set(
            'JOURNALIX_ACCESS_TOKEN',
            response.token,
            undefined,
            '/',
            undefined,
            true,
            'Strict'
          );
          this.router.navigate(['/content/main-page']);
        } else {
          this.errorMessage = 'Token fehlt in der API-Antwort.';
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login fehlgeschlagen.';
      }
    });
  }
}
