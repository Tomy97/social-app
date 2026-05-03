import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, LogOut, Plus } from 'lucide-angular';
import { UserInterface } from '@interfaces/user.interface';
import { LogoComponent } from '@shared/components/molecules/logo-component/logo-component';

@Component({
  selector: 'app-navbar-component',
  imports: [LucideAngularModule, LogoComponent],
  templateUrl: './navbar-component.html',
})
export class NavbarComponent {
  @Input({ required: true }) currentUser!: UserInterface;
  @Output() logout = new EventEmitter<void>();

  readonly plus = Plus;
  readonly logOut = LogOut;
}
