import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@shared/components/atoms/button-component/button-component';
import { GoogleIcon } from '../../atoms/google-icon/google-icon';
import { LogoComponent } from '@shared/components/molecules/logo-component/logo-component';
import { PasswordInputComponent } from '../../molecules/password-input-component/password-input-component';
import { FormInputComponent } from '../../molecules/form-input-component/form-input-component';
import { AuthStore } from '@features/auth/store/auth.store';

@Component({
  selector: 'app-login-form-card-component',
  imports: [
    ButtonComponent,
    GoogleIcon,
    LogoComponent,
    PasswordInputComponent,
    FormInputComponent,
  ],
  templateUrl: './login-form-card-component.html',
})
export class LoginFormCardComponent {
  readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  email = '';
  password = '';
  emailTouched = false;
  passwordTouched = false;

  constructor() {
    this.authStore.hydrate();

    if (this.authStore.isAuthenticated()) {
      void this.router.navigate(['/feed']);
    }
  }

  onEmailChange(value: string): void {
    this.email = value;
    this.emailTouched = true;
    this.authStore.clearError();
  }

  onPasswordChange(value: string): void {
    this.password = value;
    this.passwordTouched = true;
    this.authStore.clearError();
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    this.emailTouched = true;
    this.passwordTouched = true;

    if (this.emailError || this.passwordError) {
      return;
    }

    this.authStore.login(this.email.trim(), this.password);

    if (this.authStore.isAuthenticated()) {
      void this.router.navigate(['/feed']);
    }
  }

  onGoogleLogin(): void {
    this.authStore.loginWithGoogle();
    if (this.authStore.isAuthenticated()) {
      void this.router.navigate(['/feed']);
    }
  }

  get emailError(): string {
    if (!this.emailTouched) {
      return '';
    }

    const normalizedEmail = this.email.trim();
    if (!normalizedEmail) {
      return 'Email is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return 'Enter a valid email address.';
    }

    return '';
  }

  get passwordError(): string {
    if (!this.passwordTouched) {
      return '';
    }

    if (!this.password) {
      return 'Password is required.';
    }

    if (this.password.length < 6) {
      return 'Password must be at least 6 characters.';
    }

    return '';
  }
}
