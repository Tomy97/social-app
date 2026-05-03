import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-profile-summary-component',
  imports: [NgClass],
  templateUrl: './profile-summary-component.html',
})
export class ProfileSummaryComponent {
  @Input() avatarUrl = '';
  @Input() name = '';
  @Input() subtitle = '';
  @Input() avatarSize: 'sm' | 'md' = 'md';
  @Input() containerClass: string[] = [];

  get avatarSizeClass(): string {
    return this.avatarSize === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
  }
}
