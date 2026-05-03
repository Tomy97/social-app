import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Ellipsis, LucideAngularModule } from 'lucide-angular';
import { UserInterface } from '@interfaces/user.interface';
import { PostInterface } from '@interfaces/post.interface';
import { ProfileSummaryComponent } from '@shared/components/molecules/profile-summary-component/profile-summary-component';
import { ButtonComponent } from '@shared/components/atoms/button-component/button-component';
import { PostActionsComponent } from '../../molecules/post-actions-component/post-actions-component';
import { PostCommentsComponent } from '../../molecules/post-comments-component/post-comments-component';

@Component({
  selector: 'app-post-card-component',
  imports: [LucideAngularModule, ProfileSummaryComponent, ButtonComponent, PostActionsComponent, PostCommentsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './post-card-component.html',
})
export class PostCardComponent {
  @Input({ required: true }) post!: PostInterface;
  @Input({ required: true }) currentUser!: UserInterface;
  @Output() likeToggled = new EventEmitter<number>();
  @Output() saveToggled = new EventEmitter<number>();
  @Output() repostedToggled = new EventEmitter<number>();
  @Output() commentAdded = new EventEmitter<{ postId: number; content: string }>();

  readonly ellipsis = Ellipsis;

  isCommentsOpen = false;
  commentContent = '';

  get postSubtitle(): string {
    return `@${this.post.author.handle} • ${this.post.createdAt}`;
  }

  onToggleLike(): void {
    this.likeToggled.emit(this.post.id);
  }

  onToggleSave(): void {
    this.saveToggled.emit(this.post.id);
  }

  onToggleComments(): void {
    this.isCommentsOpen = !this.isCommentsOpen;
  }

  onToggleReposted(): void {
    this.repostedToggled.emit(this.post.id);
  }

  onCommentContentChange(value: string): void {
    this.commentContent = value;
  }

  onCommentSubmitted(): void {
    const normalizedContent = this.commentContent.trim();
    if (!normalizedContent) {
      return;
    }
    this.commentAdded.emit({ postId: this.post.id, content: normalizedContent });
    this.commentContent = '';
  }
}
