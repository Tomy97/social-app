import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { UserInterface } from '../../../../interfaces/user.interface';
import { CreatePostModalComponent } from '../create-post-modal-component/create-post-modal-component';

@Component({
  selector: 'app-create-post-composer-component',
  imports: [LucideAngularModule, CreatePostModalComponent],
  templateUrl: './create-post-composer-component.html',
})
export class CreatePostComposerComponent {
  @Input({ required: true }) currentUser!: UserInterface;
  @Output('createPost') postPublished = new EventEmitter<{ content: string; imageUrl?: string }>();

  readonly plus = Plus;

  isModalOpen = false;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onModalPublish(payload: { content: string; imageUrl?: string }): void {
    this.postPublished.emit(payload);
    this.closeModal();
  }
}
