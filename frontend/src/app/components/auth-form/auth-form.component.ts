import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Importez ceci

@Component({
  selector: 'app-auth-form',
  standalone: true,
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule, // Ajoutez ici
  ],
})
export class AuthFormComponent {
  @Input() mode: 'login' | 'register' = 'register';
  @Input() isLoading: boolean = false; // Nouvel Input pour l'état de chargement
  @Input() authErrorMessage: string | null = null; // Nouvel Input pour le message d'erreur

  @Output() formSubmitted = new EventEmitter<{
    email: string;
    password: string;
  }>();

  authForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.authForm.valid && !this.isLoading) {
      // S'assurer de ne pas soumettre si déjà en chargement
      // Le composant parent mettra isLoading à true avant l'appel API
      // et authErrorMessage à null
      this.formSubmitted.emit(this.authForm.value);
    }
  }

  get isLogin() {
    return this.mode === 'login';
  }
}
