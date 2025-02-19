import { Component, inject} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserControllerService} from '../../openapi-client';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  userControllerService = inject(UserControllerService);
  router = inject(Router);
  toastr = inject(ToastrService);

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
      this.toastr.error('Bitte füllen Sie alle Felder korrekt aus.', 'Fehler');
      return;
    }

    const formData = this.registerFormGroup.value;

    // Prüfe, ob E-Mail und Passwort übereinstimmen
    this.userControllerService.registerUser({
      firstName: formData.firstName!,
      lastName: formData.lastName!,
      email: formData.email!,
      password: formData.password!
    }).subscribe({
      next: () => {
        console.log('Registrierung erfolgreich mit diesen Daten: ', formData);
        this.toastr.success('Registrierung erfolgreich', 'Erfolg');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.';
        this.toastr.error(this.errorMessage ?? 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.', 'Fehler');
      }
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
