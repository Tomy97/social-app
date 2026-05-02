import { Component } from '@angular/core';
import { ButtonComponent } from '../../atoms/button-component/button-component';
import { GoogleIcon } from '../../atoms/google-icon/google-icon';
import { LogoComponent } from '../../molecules/logo-component/logo-component';
import { PasswordInputComponent } from '../../molecules/password-input-component/password-input-component';
import { FormInputComponent } from '../../molecules/form-input-component/form-input-component';

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
export class LoginFormCardComponent {}
