import { Component } from '@angular/core';
import { AuthService } from 'app/services/AuthService';
import { Router } from '@angular/router';
import { AuthFormComponent } from 'app/components/auth-form/auth-form.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [AuthFormComponent],
  template: ` <app-auth-form
    mode="login"
    [isLoading]="isAuthLoading"
    [authErrorMessage]="authenticationError"
    (formSubmitted)="onLoginSubmit($event)"
  >
  </app-auth-form>`,
})
export class RegisterComponent {
  isAuthLoading = false;
  authenticationError: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLoginSubmit(credentials: { email: string; password: string }) {
    this.isAuthLoading = true;
    this.authenticationError = null; // Réinitialiser l'erreur précédente

    // Simuler un appel API
    setTimeout(() => {
      if (
        credentials.email === 'test@example.com' &&
        credentials.password === 'password123'
      ) {
        console.log('Login successful', credentials);
        // Naviguer ou faire autre chose
        this.isAuthLoading = false;
      } else {
        console.error('Login failed');
        this.authenticationError =
          "L'adresse e-mail ou le mot de passe est incorrect.";
        this.isAuthLoading = false;
      }
    }, 2000);

    /* Exemple avec un vrai service:
    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isAuthLoading = false;
        // Gérer la réussite (ex: redirection)
      },
      error: (err) => {
        this.isAuthLoading = false;
        this.authenticationError = err.message || "Une erreur d'authentification est survenue.";
      }
    });
    */
  }

  handleRegister(credentials: { email: string; password: string }) {
    this.authService.register(credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.access_token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erreur inscription :', err);
        // Afficher une notification ou message d’erreur
      },
    });
  }
}
