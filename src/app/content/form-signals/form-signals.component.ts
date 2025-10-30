import {Component, signal} from '@angular/core';
import {
  apply, applyEach,
  applyWhen,
  Control,
  disabled,
  form, maxLength, minLength, required, schema,
  submit,
} from '@angular/forms/signals';
import { SuperheroRegistrationInterface, VEHICLE_TYPES } from './form-signal-interface/SuperheroRegistrationInterface';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {longTextSchema, textSchema, vehicleSchema} from './schemas/superhero-schemas';

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
    MatButtonModule,
    MatIconModule
  ],
  styleUrl: './form-signals.component.scss'
})
export class FormSignalsComponent {

  protected readonly vehicleTypes = VEHICLE_TYPES;

  protected readonly superheroRegistration = signal<SuperheroRegistrationInterface>({
    alias: '',
    realName: '',
    powers: ['Laser-Eyes','Ungodly Demon-Powers'],
    weakness: '',
    wearsCape: false,
    capeColor: '',
    archEnemy: '',
    liabilityDamage: 1,
    registrationDate: new Date(),
    hasVehicle: false,
    vehicle: {
      type: 'bicycle',
      speed: 0
    }
  });


  // Form mit Validation Schema
  protected readonly superheroRegistrationForm = form(this.superheroRegistration, (fieldPath) => {
    apply(fieldPath.alias, textSchema);
    apply(fieldPath.realName, textSchema);
    apply(fieldPath.archEnemy, textSchema);
    apply(fieldPath.weakness, longTextSchema);
    applyEach(fieldPath.powers, textSchema);

    applyWhen(
      fieldPath.capeColor,
      (ctx) => ctx.valueOf(fieldPath.wearsCape), textSchema
    );
    disabled(fieldPath.capeColor, (ctx) => !ctx.valueOf(fieldPath.wearsCape));


    applyWhen(
      fieldPath.vehicle,
      (ctx) => ctx.valueOf(fieldPath.hasVehicle),
      vehicleSchema
    );

    disabled(fieldPath.vehicle.type, (ctx) => !ctx.valueOf(fieldPath.hasVehicle));
    disabled(fieldPath.vehicle.speed, (ctx) => !ctx.valueOf(fieldPath.hasVehicle));
  });


  async onSubmit(): Promise<void> {
    await submit(this.superheroRegistrationForm, async (form) => {
      console.log('📝 Submitting:', form().value());

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('✅ Success!');
      form().reset();
      return undefined;
    });
  }


  addPower(): void {
    this.superheroRegistration.update(data => ({
      ...data,
      powers: [...data.powers, '']
    }));
  }

  removePower(index: number): void {
    this.superheroRegistration.update(data => ({
      ...data,
      powers: data.powers.filter((_, i) => i !== index)
    }));
  }

}
