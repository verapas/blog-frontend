import {Component, signal} from '@angular/core';
import {Control, form} from '@angular/forms/signals';
import { SuperheroRegistrationInterface } from './form-signal-interface/SuperheroRegistrationInterface';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-signals',
  standalone: true,
  templateUrl: './form-signals.component.html',
  imports: [
    Control,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  styleUrl: './form-signals.component.scss'
})
export class FormSignalsComponent {

  protected readonly superheroRegistration = signal<SuperheroRegistrationInterface>({
    alias: '',
    realName: '',
    superPower: null,
    weakness: '',
    wearsCape: false,
    archEnemy: '',
    liabilityDamage: 1,
    registrationDate: new Date()
  });

  protected readonly superheroRegistrationForm = form(this.superheroRegistration);

  logForm(): void {
    console.log('FormSignals value:', this.superheroRegistration());
  }

}
