import { Component } from '@angular/core';
import { LoginFormCardComponent } from '../../../../shared/components/organisms/login-form-card-component/login-form-card-component';

@Component({
  selector: 'app-login',
  imports: [LoginFormCardComponent],
  templateUrl: './login.html',
})
export class Login {}
