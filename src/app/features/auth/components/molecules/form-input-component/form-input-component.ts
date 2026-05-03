import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputComponent } from '@shared/components/atoms/input-component/input-component';

@Component({
  selector: 'app-form-input-component',
  imports: [InputComponent],
  standalone: true,
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
