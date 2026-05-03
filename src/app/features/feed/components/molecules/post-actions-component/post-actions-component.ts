import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Bookmark, Heart, MessageCircle, Repeat2 } from 'lucide-angular';
import { PostInterface } from '@interfaces/post.interface';
import { PostActionButtonComponent } from '../../atoms/post-action-button-component/post-action-button-component';

@Component({
  selector: 'app-post-actions-component',
  imports: [PostActionButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './post-actions-component.html',
})
export class PostActionsComponent {
  @Input({ required: true }) post!: PostInterface;
  @Input() commentsOpen = false;
  @Output() likeToggled = new EventEmitter<void>();
  @Output() repostedToggled = new EventEmitter<void>();
  @Output() saveToggled = new EventEmitter<void>();
  @Output() commentToggled = new EventEmitter<void>();

  readonly heart = Heart;
  readonly messageCircle = MessageCircle;
  readonly repeat2 = Repeat2;
  readonly bookmark = Bookmark;
}
