import { Component } from '@angular/core';

import { initialPosts, currentUser, users } from '../../../../lib/mock/mock-data';
import { PostInterface } from '../../../../interfaces/post.interface';
import { UserInterface } from '../../../../interfaces/user.interface';
import { FeedHeaderComponent } from '../../../../shared/components/organisms/feed-header-component/feed-header-component';
import { CreatePostComposerComponent } from '../../../../shared/components/organisms/create-post-composer-component/create-post-composer-component';
import { PostCardComponent } from '../../../../shared/components/organisms/post-card-component/post-card-component';
import { SuggestionsCardComponent } from '../../../../shared/components/organisms/suggestions-card-component/suggestions-card-component';

@Component({
  selector: 'app-feed',
  imports: [
    FeedHeaderComponent,
    CreatePostComposerComponent,
    PostCardComponent,
    SuggestionsCardComponent,
  ],
  templateUrl: './feed.html',
})
export class Feed {
  posts: PostInterface[] = initialPosts;
  currentUser: UserInterface = currentUser;
  users: Omit<UserInterface, 'email' | 'userName'>[] = users;
}
