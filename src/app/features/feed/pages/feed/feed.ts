import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { initialPosts, currentUser, users } from '../../../../lib/mock/mock-data';
import { CommentInterface } from '../../../../interfaces/comment.interface';
import { PostInterface } from '../../../../interfaces/post.interface';
import { UserInterface } from '../../../../interfaces/user.interface';
import { NavbarComponent } from '../../../../shared/components/organisms/navbar-component/navbar-component';
import { CreatePostComposerComponent } from '../../../../shared/components/organisms/create-post-composer-component/create-post-composer-component';
import { PostCardComponent } from '../../../../shared/components/organisms/post-card-component/post-card-component';
import { SuggestionsCardComponent } from '../../../../shared/components/organisms/suggestions-card-component/suggestions-card-component';
import { AuthStore } from '../../../auth/store/auth.store';

const POSTS_STORAGE_KEY = 'social-app-posts';

@Component({
  selector: 'app-feed',
  imports: [
    NavbarComponent,
    CreatePostComposerComponent,
    PostCardComponent,
    SuggestionsCardComponent,
  ],
  templateUrl: './feed.html',
})
export class Feed {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  posts: PostInterface[] = [];
  currentUser: UserInterface = currentUser;
  users: Omit<UserInterface, 'email' | 'userName'>[] = users;

  constructor() {
    this.posts = this.hydratePosts();
  }

  onLogout(): void {
    this.authStore.logout();
    void this.router.navigate(['/login']);
  }

  onCreatePost(event: { content: string; imageUrl?: string } | string): void {
    const content = (typeof event === 'string' ? event : event.content).trim();
    const imageUrl = typeof event === 'string' ? undefined : event.imageUrl;
    if (!content && !imageUrl) {
      return;
    }

    const nextId = this.posts.length ? Math.max(...this.posts.map((post) => post.id)) + 1 : 1;
    const { email: _email, userName: _userName, ...author } = this.currentUser;

    const newPost: PostInterface = {
      id: nextId,
      author,
      content,
      imageUrl,
      createdAt: 'ahora',
      likes: 0,
      liked: false,
      reposts: 0,
      reposted: false,
      saved: false,
      comments: [],
    };

    this.setPosts([newPost, ...this.posts]);
  }

  onToggleLike(postId: number): void {
    const updatedPosts = this.posts.map((post) => {
      if (post.id !== postId) {
        return post;
      }

      const liked = !post.liked;
      return {
        ...post,
        liked,
        likes: liked ? post.likes + 1 : Math.max(post.likes - 1, 0),
      };
    });
    this.setPosts(updatedPosts);
  }

  onToggleSave(postId: number): void {
    const updatedPosts = this.posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            saved: !post.saved,
          }
        : post,
    );
    this.setPosts(updatedPosts);
  }

  repostedToggled(postId: number): void {
    const updatedPosts = this.posts.map((post) => {
      if (post.id !== postId) {
        return post;
      }

      const reposted = !post.reposted;
      const currentReposts = post.reposts ?? 0;
      return {
        ...post,
        reposted,
        reposts: reposted ? currentReposts + 1 : Math.max(currentReposts - 1, 0),
      };
    });

    this.setPosts(updatedPosts);
  }

  onAddComment(event: { postId: number; content: string }): void {
    const normalizedContent = event.content.trim();
    if (!normalizedContent) {
      return;
    }

    const nextCommentId = this.getNextCommentId();
    const { email: _email, userName: _userName, ...author } = this.currentUser;

    const newComment: CommentInterface = {
      id: nextCommentId,
      author,
      content: normalizedContent,
      text: normalizedContent,
      createdAt: 'ahora',
    };

    const updatedPosts = this.posts.map((post) =>
      post.id === event.postId
        ? {
            ...post,
            comments: [...post.comments, newComment],
          }
        : post,
    );

    this.setPosts(updatedPosts);
  }

  private hydratePosts(): PostInterface[] {
    if (typeof localStorage === 'undefined') {
      return this.clonePosts(initialPosts);
    }

    try {
      const rawPosts = localStorage.getItem(POSTS_STORAGE_KEY);
      if (rawPosts) {
        const parsedPosts = JSON.parse(rawPosts) as unknown;
        if (Array.isArray(parsedPosts)) {
          return this.normalizePosts(parsedPosts as PostInterface[]);
        }
      }
    } catch {
      localStorage.removeItem(POSTS_STORAGE_KEY);
    }

    const seedPosts = this.normalizePosts(this.clonePosts(initialPosts));
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(seedPosts));
    return seedPosts;
  }

  private setPosts(posts: PostInterface[]): void {
    this.posts = [...posts];
    this.persistPosts();
  }

  private persistPosts(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(this.posts));
  }

  private clonePosts(posts: PostInterface[]): PostInterface[] {
    return JSON.parse(JSON.stringify(posts)) as PostInterface[];
  }

  private normalizePosts(posts: PostInterface[]): PostInterface[] {
    return posts.map((post) => ({
      ...post,
      createdAt: post.createdAt === 'now' ? 'ahora' : post.createdAt,
      comments: post.comments.map((comment) => ({
        ...comment,
        createdAt: comment.createdAt === 'now' ? 'ahora' : comment.createdAt,
      })),
      reposted: post.reposted ?? false,
      reposts: post.reposts ?? 0,
    }));
  }

  private getNextCommentId(): number {
    const allCommentIds = this.posts.flatMap((post) => post.comments.map((comment) => comment.id));
    return allCommentIds.length ? Math.max(...allCommentIds) + 1 : 1;
  }
}
