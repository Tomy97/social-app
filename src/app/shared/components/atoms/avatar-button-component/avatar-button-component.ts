import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-button-component',
  templateUrl: './avatar-button-component.html',
})
export class AvatarButtonComponent {
  @Input({ required: true }) avatarUrl!: string;
  @Input() alt = 'Avatar';
}
