import { Component } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-close-button-component',
  imports: [LucideAngularModule],
  templateUrl: './close-button-component.html',
})
export class CloseButtonComponent {
  readonly close = X;
}
