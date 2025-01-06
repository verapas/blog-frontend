import {Component, EventEmitter, Output} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @Output() switchToRegister = new EventEmitter<void>();

  // username = '';
  // password = '';
  // errorMessage = '';


  navigateToRegister(): void {
    this.switchToRegister.emit();
  }

  constructor(private router: Router) {}
  // constructor(private router: Router, private httpClient: HttpClient) {}

  onLogin(event: Event): void {
    event.preventDefault();


    // const loginData = {
    //   username: this.username,
    //   password: this.password
    // }
    //
    //
    // //Put Request an die API senden fürs Login
    // this.httpClient.put('http://localhost:????/login', loginData)
    //   .subscribe({
    //     next: (response: any) => {
    //       console.log('Login erfolgreich', response);
    //       localStorage.setItem('authToken', response.token);
    //       this.router.navigate(['/main']);
    //     },
    //     error: (err) => {
    //       console.log('Login fehlgeschlagen')
    //       this.errorMessage = 'Benutzernamen oder Passwort ungültig'
    //     }
    //   })



    this.router.navigate(['/main']); // Navigiert zur Hauptseite nach dem Login
  }
}
