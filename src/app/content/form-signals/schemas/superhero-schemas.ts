import { schema, Schema, required, minLength, maxLength } from '@angular/forms/signals';
import {Vehicle} from '../form-signal-interface/SuperheroRegistrationInterface';
import {min} from 'rxjs';

// Text Schema für Namen, Titel, etc.
export const textSchema: Schema<string> = schema((fieldPath) => {
  required(fieldPath, { message: 'This field is required' });
  minLength(fieldPath, 3, { message: 'At least 3 characters' });
  maxLength(fieldPath, 50, { message: 'Maximum 50 characters' });
});

// Short Text Schema für kürzere Felder
export const shortTextSchema: Schema<string> = schema((fieldPath) => {
  required(fieldPath, { message: 'This field is required' });
  minLength(fieldPath, 2, { message: 'At least 2 characters' });
  maxLength(fieldPath, 30, { message: 'Maximum 30 characters' });
});


// Long Text Schema für längere Beschreibungen
export const longTextSchema: Schema<string> = schema((fieldPath) => {
  required(fieldPath, { message: 'This field is required' });
  minLength(fieldPath, 10, { message: 'At least 10 characters for a good description' });
  maxLength(fieldPath, 200, { message: 'Maximum 200 characters' });
});

export const vehicleSchema: Schema<Vehicle> = schema((fieldPath) => {
  required(fieldPath.type, { message: 'Vehicle type is required' });
  required(fieldPath.speed, { message: 'Speed is required' });
})

