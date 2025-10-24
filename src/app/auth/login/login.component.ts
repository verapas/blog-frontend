import {afterNextRender, Component, DestroyRef, EventEmitter, inject, Output, viewChild} from '@angular/core';
import {Router, RouterModule} from '@angular/router';

import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserControllerService} from '../../openapi-client';
import {ToastrService} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userControllerService = inject(UserControllerService);
  router = inject(Router);
  toastr = inject(ToastrService);
  cookieService = inject(CookieService);
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
      this.toastr.error('Bitte fülle alle Felder korrekt aus.', 'Fehler');
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

          // Statt localStorage speichern wir den Token in einem Cookie.
          // Beachte: Hier kannst du keine HttpOnly-Cookies setzen, wenn du es clientseitig machst.
          this.cookieService.set(
            'JOURNALIX_ACCESS_TOKEN',       // Name des Cookies
            response.token,       // Wert des Cookies
            undefined,            // Keine explizite Ablaufzeit (Sitzungscookie)
            '/', // Pfad
            undefined,            // Keine Domain explizit angeben
            true,                 // secure: true – das Cookie wird nur über HTTPS gesendet
            'Strict'              // sameSite: 'Strict' – das Cookie wird nur an gleiche Site-Anfragen gesendet
          );

          console.log('Login erfolgreich! Willkommen zurück.');
          this.toastr.success('Login erfolgreich! Willkommen zurück.', 'Erfolg');
          this.router.navigate(['/content/main-page']);
        } else {
          this.errorMessage = 'Token fehlt in der API-Antwort.';
          console.error('Token fehlt in der Antwort:', response);
          this.toastr.error('Token fehlt in der API-Antwort.', 'Fehler');
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.';
        console.error('Fehler beim Login:', err);
        this.toastr.error(this.errorMessage ?? 'Login fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.', 'Fehler');
      }
    });
  }
}
