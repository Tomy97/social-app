import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() value = '';
  @Input() invalid = false;
  @Input() errorMessage = '';
  @Output() valueChange = new EventEmitter<string>();

  showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
