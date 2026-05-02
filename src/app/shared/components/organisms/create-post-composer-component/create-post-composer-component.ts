import { Component, Input } from '@angular/core';
import { LucideAngularModule, Image } from 'lucide-angular';
import { UserInterface } from '../../../../interfaces/user.interface';
import { InputComponent } from '../../atoms/input-component/input-component';

@Component({
  selector: 'app-create-post-composer-component',
  imports: [LucideAngularModule, InputComponent],
  templateUrl: './create-post-composer-component.html',
})
export class CreatePostComposerComponent {
  @Input({ required: true }) currentUser!: UserInterface;

  readonly image = Image;
}
