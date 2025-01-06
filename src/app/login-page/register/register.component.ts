import {Component, EventEmitter, Output} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = '';
  confirmEmail: string = '';
  password: string = '';
  confirmPassword: string = '';

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onRegister(event: Event) {
    event.preventDefault();
    if (
      this.isValidEmail(this.email) &&
      this.email === this.confirmEmail &&
      this.password === this.confirmPassword
    ) {
      alert('Registrierung erfolgreich!');
      // Hier API-Aufruf oder Weiterleitung implementieren
    } else {
      alert('Bitte Eingaben überprüfen.');
    }
  }

  @Output() switchToLogin = new EventEmitter<void>();

  navigateToLogin(): void {
    this.switchToLogin.emit();
  }
}
