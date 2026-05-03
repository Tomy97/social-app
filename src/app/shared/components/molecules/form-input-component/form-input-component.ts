import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputComponent } from '../../atoms/input-component/input-component';

@Component({
  selector: 'app-form-input-component',
  imports: [InputComponent],
  templateUrl: './form-input-component.html',
})
export class FormInputComponent {
  @Input() id = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' = 'text';
  @Input() value = '';
  @Input() invalid = false;
  @Input() errorMessage = '';
  @Output() valueChange = new EventEmitter<string>();
}
