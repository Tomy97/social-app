import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, SendHorizontal } from 'lucide-angular';
import { CommentInterface } from '@interfaces/comment.interface';
import { UserInterface } from '@interfaces/user.interface';

@Component({
  selector: 'app-post-comments-component',
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './post-comments-component.html',
})
export class PostCommentsComponent {
  @Input({ required: true }) comments!: CommentInterface[];
  @Input({ required: true }) currentUser!: UserInterface;
  @Input() commentContent = '';
  @Output() commentContentChange = new EventEmitter<string>();
  @Output() commentSubmitted = new EventEmitter<void>();

  readonly send = SendHorizontal;

  onCommentInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.commentContentChange.emit(target.value);
  }
}
