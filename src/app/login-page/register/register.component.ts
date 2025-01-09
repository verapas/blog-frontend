import { afterNextRender, Component, DestroyRef, EventEmitter, inject, Output, viewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @Output() switchToLogin = new EventEmitter<void>();


  constructor(private router: Router) {
  }

  onSubmit(formData: NgForm) {
    if (formData.valid) {
      const enteredEmail = formData.value.email;
      const enteredConfirmEmail = formData.value.confirmEmail;
      const enteredPassword = formData.value.password;
      const enteredConfirmPassword = formData.value.confirmPassword;

      if (enteredEmail === enteredConfirmEmail && enteredPassword === enteredConfirmPassword) {
        console.log('Registrierung:', enteredEmail, enteredPassword);

        // Hier die Logik für die Registrierung implementieren
        // z.B. API-Aufruf oder Weiterleitung

        this.router.navigate(['/main']);
      } else {
        console.log('E-Mail-Adressen oder Passwörter stimmen nicht überein');
      }
    } else {
      console.log('Formular ist ungültig');
    }
  }

  navigateToLogin(): void {
    this.switchToLogin.emit();
  }
}
