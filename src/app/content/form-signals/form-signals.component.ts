import {Component, signal} from '@angular/core';
import {
  apply,
  Control,
  form,
  maxLength,
  min,
  minLength,
  required,
  schema,
  Schema,
  submit,
  validate
} from '@angular/forms/signals';
import { SuperheroRegistrationInterface } from './form-signal-interface/SuperheroRegistrationInterface';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import {$locationShim} from '@angular/common/upgrade';
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
    apply(fieldPath.capeColor, textSchema);

    required(fieldPath.capeColor, {
      when: ({ valueOf }) => valueOf(fieldPath.wearsCape) === true
    })
  });



  // Neue submit() Funktion mit async Support
  async onSubmit(): Promise<void> {
    await submit(this.superheroRegistrationForm, async (value) => {
      console.log('📝 Submitting superhero registration:', value);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('✅ Registration complete!');
      alert('🦸‍♂️ Superhero erfolgreich registriert!');
    });
  }

  // Alte Methode zum Vergleich (optional für deinen Vortrag)
  logForm(): void {
    console.log('FormSignals value:', this.superheroRegistration());
    console.log('Form valid:', this.superheroRegistrationForm().valid());
  }
}
