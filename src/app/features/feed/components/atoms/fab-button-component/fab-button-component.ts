import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fab-button-component',
  templateUrl: './fab-button-component.html',
})
export class FabButtonComponent {
  @Input() ariaLabel = '';
}
