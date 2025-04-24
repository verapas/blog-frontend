import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserEntityControllerService } from '../../openapi-client/api/userEntityController.service';
import { UserSearchControllerService } from '../../openapi-client/api/userSearchController.service';
import { UserShowDto } from '../../openapi-client/model/userShowDto';
import { UserUpdateDto } from '../../openapi-client/model/userUpdateDto';
import { EntityModelUser } from '../../openapi-client/model/entityModelUser';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

// Passwort-Übereinstimmungs-Validator
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
};

interface DecodedToken {
  sub: string; // Email
  id: string;  // User-ID
  roles?: string;
  exp?: number;
  iat?: number;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userProfile: UserShowDto | null = null;
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  isEditing = false;
  isChangingPassword = false;
  errorMessage = '';
  passwordErrorMessage = '';
  passwordSuccess = false;
  userId = ''; // Dies wird durch die Authentifizierung gesetzt



  // Methode zum Extrahieren des Tokens
  extractUserDataFromToken(): { email: string | null, id: string | null } {
    try {
      const token = this.cookieService.get('JOURNALIX_ACCESS_TOKEN');
      if (!token) return { email: null, id: null };

      const decoded = jwtDecode<DecodedToken>(token);
      return {
        email: decoded.sub || null,
        id: decoded.id || null
      };
    } catch (error) {
      console.error('Fehler beim Dekodieren des Tokens:', error);
      return { email: null, id: null };
    }
  }

  constructor(
    private userService: UserEntityControllerService,
    private userSearchService: UserSearchControllerService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.initForms();

    const userData = this.extractUserDataFromToken();
    if (!userData.email || !userData.id) {
      this.errorMessage = 'Fehlende Benutzerinformationen im Token.';
      return;
    }

    this.userId = userData.id;
    this.loadUserProfile(userData.email);
  }

  initForms(): void {
    // Hauptprofil-Formular
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    // Passwort-Formular
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  loadUserProfile(email: string): void {
    this.userSearchService.executeSearchUserGet(email).subscribe({
      next: (response: EntityModelUser) => {
        this.userProfile = {
          id: parseInt(this.userId),
          firstName: response.firstName || '',
          lastName: response.lastName || '',
          email: response.email || '',
          role: response.role || ''
        };
        this.updateFormValues();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Fehler beim Laden des Profils.';
        console.error('Fehler beim Laden des Profils:', error);
      }
    });
  }

  updateFormValues(): void {
    if (this.userProfile) {
      this.profileForm.patchValue({
        firstName: this.userProfile.firstName,
        lastName: this.userProfile.lastName,
        email: this.userProfile.email
      });
    }
  }

  startEditing(): void {
    this.isEditing = true;
    this.isChangingPassword = false;
  }

  startChangingPassword(): void {
    this.isChangingPassword = true;
    this.passwordForm.reset();
    this.passwordErrorMessage = '';
    this.passwordSuccess = false;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.updateFormValues();
    this.errorMessage = '';
  }

  cancelPasswordChange(): void {
    this.isChangingPassword = false;
    this.passwordForm.reset();
    this.passwordErrorMessage = '';
  }

  saveProfile(): void {
    if (this.profileForm.valid && this.userId) {
      const updateData: UserUpdateDto = {
        firstName: this.profileForm.get('firstName')?.value,
        lastName: this.profileForm.get('lastName')?.value,
        email: this.profileForm.get('email')?.value
      };

      this.userService.putItemResourceUserPut1(this.userId, updateData).subscribe({
        next: (response: EntityModelUser) => {
          // Aktualisiere das lokale Profil mit den neuen Daten
          if (response) {
            this.userProfile = {
              id: parseInt(this.userId),
              firstName: response.firstName || '',
              lastName: response.lastName || '',
              email: response.email || '',
              role: response.role || ''
            };
          }
          this.isEditing = false;
          this.errorMessage = '';
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = 'Fehler beim Aktualisieren des Profils. Bitte versuchen Sie es später erneut.';
          console.error('Fehler beim Aktualisieren des Profils:', error);
        }
      });
    }
  }

  changePassword(): void {
    if (this.passwordForm.valid && this.userId) {
      const currentPassword = this.passwordForm.get('currentPassword')?.value;
      const newPassword = this.passwordForm.get('newPassword')?.value;

      const updateData: UserUpdateDto = {
        password: newPassword,
      };

      this.userService.putItemResourceUserPut1(this.userId, updateData).subscribe({
        next: () => {
          this.passwordSuccess = true;
          this.passwordErrorMessage = '';
          this.passwordForm.reset();
          // Nach einer kurzen Verzögerung den Passwort-Änderungsmodus schliessen
          setTimeout(() => {
            this.isChangingPassword = false;
            this.passwordSuccess = false;
          }, 3000);
        },
        error: (error: HttpErrorResponse) => {
          this.passwordErrorMessage = 'Fehler bei der Passwortänderung. Bitte überprüfen Sie Ihr aktuelles Passwort.';
          console.error('Fehler bei der Passwortänderung:', error);
        }
      });
    }
  }
}
