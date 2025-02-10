import {afterNextRender, Component, DestroyRef, EventEmitter, inject, Output, viewChild} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {debounceTime} from 'rxjs';
import {UserControllerService} from '../../openapi-client';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userControllerService = inject(UserControllerService);
  router = inject(Router);

  errorMessage: string | null = null;

  loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  /**
   * @method onSubmit
   * @description Verarbeitet das Absenden des Login-Formulars.
   * Prüft, ob das Formular valide ist, sendet eine Login-Anfrage an das Backend
   * und speichert das JWT-Token bei Erfolg.
   */
  onSubmit() {
    this.errorMessage = null;

    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      console.warn('Bitte fülle alle Felder korrekt aus.');
      return;
    }

    const formData = this.loginFormGroup.value;

    this.userControllerService.login({
      email: formData.email!,
      password: formData.password!,
    }).subscribe({
      next: (response) => {
        if (response.token) {
          console.log('Bearer Token:', response.token);
          localStorage.setItem('ACCESS_TOKEN', response.token);
          console.log('Login erfolgreich! Willkommen zurück.');
          this.router.navigate(['/main']);
        } else {
          this.errorMessage = 'Token fehlt in der API-Antwort.';
          console.error('Token fehlt in der Antwort:', response);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.';
        console.error('Fehler beim Login:', err);
      }
    });
  }

}
