import { Component, Input } from '@angular/core';
import { LucideAngularModule, LogOut, Plus } from 'lucide-angular';
import { UserInterface } from '../../../../interfaces/user.interface';
import { LogoComponent } from '../../molecules/logo-component/logo-component';
import { SearchInputComponent } from '../../molecules/search-input-component/search-input-component';

@Component({
  selector: 'app-feed-header-component',
  imports: [LucideAngularModule, LogoComponent, SearchInputComponent],
  templateUrl: './feed-header-component.html',
})
export class FeedHeaderComponent {
  @Input({ required: true }) currentUser!: UserInterface;

  readonly plus = Plus;
  readonly logOut = LogOut;
}
