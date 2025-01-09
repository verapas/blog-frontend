import {afterNextRender, Component, DestroyRef, EventEmitter, inject, Output, viewChild} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {debounceTime} from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @Output() switchToRegister = new EventEmitter<void>();

  constructor(private router: Router) {

  }

  onSubmit(formData: NgForm) {
    // Werte aus dem Form-Object extrahieren
    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    console.log(enteredEmail, enteredPassword);
  }

  navigateToRegister(): void {
    this.switchToRegister.emit();
  }


  onLogin(event: Event): void {
    event.preventDefault();

    this.router.navigate(['/main']); // Navigiert zur Hauptseite nach dem Login
  }

}
