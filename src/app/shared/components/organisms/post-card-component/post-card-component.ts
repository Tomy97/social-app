import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import {
  Bookmark,
  Ellipsis,
  Heart,
  LucideAngularModule,
  MessageCircle,
  Repeat2,
  SendHorizontal,
} from 'lucide-angular';
import { UserInterface } from '../../../../interfaces/user.interface';
import { PostInterface } from '../../../../interfaces/post.interface';
import { ProfileSummaryComponent } from '../../molecules/profile-summary-component/profile-summary-component';
import { IconFillDirective } from '../../../directive/icon-fill.directive';

@Component({
  selector: 'app-post-card-component',
  imports: [LucideAngularModule, ProfileSummaryComponent, IconFillDirective],
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

  readonly heart = Heart;
  readonly messageCircle = MessageCircle;
  readonly repeat2 = Repeat2;
  readonly bookmark = Bookmark;
  readonly ellipsis = Ellipsis;
  readonly send = SendHorizontal;

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

  onCommentInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.commentContent = target.value;
  }

  onToggleReposted(): void {
    this.repostedToggled.emit(this.post.id);
  }

  onAddComment(): void {
    const normalizedContent = this.commentContent.trim();
    if (!normalizedContent) {
      return;
    }

    this.commentAdded.emit({ postId: this.post.id, content: normalizedContent });
    this.commentContent = '';
  }
}
