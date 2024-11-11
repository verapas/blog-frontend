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
  constructor(private router: Router) {}

  @Output() switchToLogin = new EventEmitter<void>();

  navigateToLogin(): void {
    this.switchToLogin.emit();
  }

  onRegister(event: Event): void {
    event.preventDefault();
    // HIer werde ich noch die Registrierlogik einfügen
    this.router.navigate(['/login']); // Zurück zur Login-Seite nach erfolgreicher Registrierung
  }

}
