import { afterNextRender, Component, DestroyRef, EventEmitter, inject, Output, viewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  router = inject(Router);

  errorMessage: string | null = null;

  registerFormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    confirmEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  onSubmit() {
    this.errorMessage = null;

    if (this.registerFormGroup.invalid) {
      this.registerFormGroup.markAllAsTouched();
      console.warn('Bitte füllen Sie alle Felder korrekt aus.');
      return;
    }

    const formData = this.registerFormGroup.value;

    // Prüfe, ob E-Mail und Passwort übereinstimmen
    if (formData.email !== formData.confirmEmail) {
      this.errorMessage = 'E-Mail-Adressen stimmen nicht überein.';
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      this.errorMessage = 'Passwörter stimmen nicht überein.';
      return;
    }

    // Todo Hier  die Logik für die Registrierung implementieren, beispielsweise einen API-Aufruf, der die Daten an das Backend sendet.
    console.log('Registrierung erfolgreich mit Daten:', formData);

    // Bei Erfolg: Navigation zur Hauptseite (oder zu einem anderen Ziel)
    this.router.navigate(['/main']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
