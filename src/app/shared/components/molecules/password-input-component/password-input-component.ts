import { Component, Input } from '@angular/core';
import { InputComponent } from '../../atoms/input-component/input-component';

@Component({
  selector: 'app-password-input-component',
  imports: [InputComponent],
  templateUrl: './password-input-component.html',
})
export class PasswordInputComponent {
  @Input() id = 'password';
  @Input() label = 'Password';
  @Input() placeholder = '••••••••';
}
