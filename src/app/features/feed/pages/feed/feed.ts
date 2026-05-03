import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { currentUser, users } from '@lib/mock/mock-data';
import { UserInterface } from '@interfaces/user.interface';
import { NavbarComponent } from '@features/feed/components/organisms/navbar-component/navbar-component';
import { CreatePostComposerComponent } from '@features/feed/components/organisms/create-post-composer-component/create-post-composer-component';
import { PostCardComponent } from '@features/feed/components/organisms/post-card-component/post-card-component';
import { AuthStore } from '@features/auth/store/auth.store';
import { FeedStore } from '@features/feed/store/feed.store';

@Component({
  selector: 'app-feed',
  imports: [
    NavbarComponent,
    CreatePostComposerComponent,
    PostCardComponent,
  ],
  templateUrl: './feed.html',
})
export class Feed {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);
  readonly feedStore = inject(FeedStore);

  users: Omit<UserInterface, 'email' | 'userName'>[] = users;

  constructor() {
    this.feedStore.hydrate();
  }

  onLogout(): void {
    this.authStore.logout();
    void this.router.navigate(['/login']);
  }

  onCreatePost(event: { content: string; imageUrl?: string } | string): void {
    this.feedStore.createPost(event, this.currentUser);
  }

  onToggleLike(postId: number): void {
    this.feedStore.toggleLike(postId);
  }

  onToggleSave(postId: number): void {
    this.feedStore.toggleSave(postId);
  }

  repostedToggled(postId: number): void {
    this.feedStore.toggleRepost(postId);
  }

  onAddComment(event: { postId: number; content: string }): void {
    this.feedStore.addComment(event, this.currentUser);
  }

  get posts() {
    return this.feedStore.posts();
  }

  get comments() {
    return this.feedStore.comments();
  }

  get currentUser(): UserInterface {
    return this.authStore.user() ?? currentUser;
  }
}
