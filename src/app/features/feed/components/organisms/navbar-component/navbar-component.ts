import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, LogOut } from 'lucide-angular';
import { UserInterface } from '@interfaces/user.interface';
import { LogoComponent } from '@shared/components/molecules/logo-component/logo-component';
import { ButtonComponent } from '@shared/components/atoms/button-component/button-component';
import { AvatarButtonComponent } from '@shared/components/atoms/avatar-button-component/avatar-button-component';

@Component({
  selector: 'app-navbar-component',
  imports: [LucideAngularModule, LogoComponent, ButtonComponent, AvatarButtonComponent],
  templateUrl: './navbar-component.html',
})
export class NavbarComponent {
  @Input({ required: true }) currentUser!: UserInterface;
  @Output() logout = new EventEmitter<void>();

  readonly logOut = LogOut;
}
