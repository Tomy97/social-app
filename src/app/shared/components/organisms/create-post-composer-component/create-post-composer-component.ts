import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, Image, Plus, X } from 'lucide-angular';
import { UserInterface } from '../../../../interfaces/user.interface';

@Component({
  selector: 'app-create-post-composer-component',
  imports: [LucideAngularModule],
  templateUrl: './create-post-composer-component.html',
})
export class CreatePostComposerComponent {
  @Input({ required: true }) currentUser!: UserInterface;
  @Output('createPost') postPublished = new EventEmitter<{ content: string; imageUrl?: string }>();

  readonly image = Image;
  readonly close = X;
  readonly plus = Plus;
  readonly maxCharacters = 280;

  isModalOpen = false;
  content = '';
  imagePreviewUrl: string | null = null;
  isDragOver = false;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.content = '';
    this.imagePreviewUrl = null;
    this.isDragOver = false;
  }

  onContentChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.content = target.value;
  }

  onPublish(): void {
    const normalizedContent = this.content.trim();
    if ((!normalizedContent && !this.imagePreviewUrl) || normalizedContent.length > this.maxCharacters) {
      return;
    }

    this.postPublished.emit({
      content: normalizedContent,
      imageUrl: this.imagePreviewUrl ?? undefined,
    });
    this.closeModal();
  }

  onSelectImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    this.loadImagePreview(file);
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    const file = event.dataTransfer?.files?.[0];
    if (!file) {
      return;
    }

    this.loadImagePreview(file);
  }

  removeImage(): void {
    this.imagePreviewUrl = null;
  }

  get remainingCharacters(): number {
    return this.maxCharacters - this.content.length;
  }

  get canPublish(): boolean {
    const normalizedContent = this.content.trim();
    return (!!normalizedContent || !!this.imagePreviewUrl) && this.content.length <= this.maxCharacters;
  }

  private loadImagePreview(file: File): void {
    if (!file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = typeof reader.result === 'string' ? reader.result : null;
    };
    reader.readAsDataURL(file);
  }
}
