import {Component, signal} from '@angular/core';
import {
  apply, applyWhen,
  Control,
  form,
  submit,
} from '@angular/forms/signals';
import { SuperheroRegistrationInterface } from './form-signal-interface/SuperheroRegistrationInterface';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import {longTextSchema, textSchema} from './schemas/superhero-schemas';

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
    superPower: '',
    weakness: '',
    wearsCape: false,
    capeColor: '',
    archEnemy: '',
    liabilityDamage: 1,
    registrationDate: new Date()
  });


  // Form mit Validation Schema
  protected readonly superheroRegistrationForm = form(this.superheroRegistration, (fieldPath) => {
    apply(fieldPath.alias, textSchema);
    apply(fieldPath.realName, textSchema);
    apply(fieldPath.superPower, textSchema);
    apply(fieldPath.archEnemy, textSchema);
    apply(fieldPath.weakness, longTextSchema);


    applyWhen(
      fieldPath.capeColor, (ctx) => ctx.valueOf(fieldPath.wearsCape), textSchema
    );
  });


  async onSubmit(): Promise<void> {
    await submit(this.superheroRegistrationForm, async (form) => {
      try {
        console.log('📝 Submitting superhero registration:', form().value());

        await new Promise(resolve => setTimeout(resolve, 1000));

        const randomError = Math.random() > 0.5;
        if (randomError) {
          throw new Error('Server Error, try again');
        }

        console.log('Registration complete!');
        form().reset();

        return undefined;
      } catch (e) {
        console.error('Registration failed:', e);

        return [
          {
            kind: 'server',
            message: (e as Error).message || 'An error occurred'
          }
        ];
      }
    });
  }

}
