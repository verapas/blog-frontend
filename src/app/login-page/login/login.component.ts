import {Component, EventEmitter, Output} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @Output() switchToRegister = new EventEmitter<void>();

  navigateToRegister(): void {
    this.switchToRegister.emit();
  }

  constructor(private router: Router) {}

  onLogin(event: Event): void {
    event.preventDefault();
    // Login-Logik hier hinzufügen
    this.router.navigate(['/main']); // Navigiert zur Hauptseite nach dem Login
  }


}
