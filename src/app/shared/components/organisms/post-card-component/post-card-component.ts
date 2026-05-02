import { Component, Input } from '@angular/core';
import {
  Bookmark,
  Ellipsis,
  Heart,
  LucideAngularModule,
  MessageCircle,
  Repeat2,
} from 'lucide-angular';
import { PostInterface } from '../../../../interfaces/post.interface';
import { ProfileSummaryComponent } from '../../molecules/profile-summary-component/profile-summary-component';

@Component({
  selector: 'app-post-card-component',
  imports: [LucideAngularModule, ProfileSummaryComponent],
  templateUrl: './post-card-component.html',
})
export class PostCardComponent {
  @Input({ required: true }) post!: PostInterface;

  readonly heart = Heart;
  readonly messageCircle = MessageCircle;
  readonly repeat2 = Repeat2;
  readonly bookmark = Bookmark;
  readonly ellipsis = Ellipsis;

  get postSubtitle(): string {
    return `@${this.post.author.handle} • ${this.post.createdAt}`;
  }
}
