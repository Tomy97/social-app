import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, Image, X } from 'lucide-angular';
import { UserInterface } from '@interfaces/user.interface';

@Component({
  selector: 'app-create-post-modal-component',
  imports: [LucideAngularModule],
  templateUrl: './create-post-modal-component.html',
})
export class CreatePostModalComponent {
  @Input({ required: true }) currentUser!: UserInterface;
  @Output() closed = new EventEmitter<void>();
  @Output() published = new EventEmitter<{ content: string; imageUrl?: string }>();

  readonly image = Image;
  readonly close = X;
  readonly maxCharacters = 280;

  content = '';
  imagePreviewUrl: string | null = null;
  isDragOver = false;

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  closeModal(): void {
    this.closed.emit();
  }

  onContentChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.content = target.value;
  }

  onPublish(): void {
    const normalizedContent = this.content.trim();
    if (
      (!normalizedContent && !this.imagePreviewUrl) ||
      normalizedContent.length > this.maxCharacters
    ) {
      return;
    }

    this.published.emit({
      content: normalizedContent,
      imageUrl: this.imagePreviewUrl ?? undefined,
    });
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
    return (
      (!!normalizedContent || !!this.imagePreviewUrl) && this.content.length <= this.maxCharacters
    );
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
