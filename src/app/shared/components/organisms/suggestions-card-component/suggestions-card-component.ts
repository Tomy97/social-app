import { Component, Input } from '@angular/core';
import { UserInterface } from '../../../../interfaces/user.interface';
import { ProfileSummaryComponent } from '../../molecules/profile-summary-component/profile-summary-component';
import { ButtonComponent } from '../../atoms/button-component/button-component';

@Component({
  selector: 'app-suggestions-card-component',
  imports: [ProfileSummaryComponent, ButtonComponent],
  templateUrl: './suggestions-card-component.html',
})
export class SuggestionsCardComponent {
  @Input({ required: true }) users: Omit<UserInterface, 'email' | 'userName'>[] = [];

  getSubtitle(handle: string): string {
    return `@${handle}`;
  }
}
