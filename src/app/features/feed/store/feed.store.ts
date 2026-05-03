import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

import { currentUser, initialPosts } from '@lib/mock/mock-data';
import { CommentInterface } from '@interfaces/comment.interface';
import { PostInterface } from '@interfaces/post.interface';
import { PostsStateInterface } from '@interfaces/posts-state.interface';
import { UserInterface } from '@interfaces/user.interface';

const POSTS_STORAGE_KEY = 'social-app-posts';

const initialState: PostsStateInterface = {
  posts: [],
  comments: [],
  loading: false,
  error: null,
};

function clonePosts(posts: PostInterface[]): PostInterface[] {
  return JSON.parse(JSON.stringify(posts)) as PostInterface[];
}

function extractComments(posts: PostInterface[]): CommentInterface[] {
  return posts.flatMap((post) => post.comments);
}

function normalizePosts(posts: PostInterface[]): PostInterface[] {
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

function readStoredPosts(): PostInterface[] | null {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  try {
    const rawPosts = localStorage.getItem(POSTS_STORAGE_KEY);
    if (!rawPosts) {
      return null;
    }

    const parsedPosts = JSON.parse(rawPosts) as unknown;
    if (!Array.isArray(parsedPosts)) {
      return null;
    }

    return normalizePosts(parsedPosts as PostInterface[]);
  } catch {
    localStorage.removeItem(POSTS_STORAGE_KEY);
    return null;
  }
}

function persistPosts(posts: PostInterface[]): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
}

function setPosts(store: any, posts: PostInterface[]): void {
  const nextPosts = [...posts];
  patchState(store, {
    posts: nextPosts,
    comments: extractComments(nextPosts),
    loading: false,
    error: null,
  });
  persistPosts(nextPosts);
}

export const FeedStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    hydrate(): void {
      if (store.posts().length > 0) {
        return;
      }

      const storedPosts = readStoredPosts();
      if (storedPosts) {
        setPosts(store, storedPosts);
        return;
      }

      const seedPosts = normalizePosts(clonePosts(initialPosts));
      setPosts(store, seedPosts);
    },
    createPost(event: { content: string; imageUrl?: string } | string, user: UserInterface = currentUser): void {
      const content = (typeof event === 'string' ? event : event.content).trim();
      const imageUrl = typeof event === 'string' ? undefined : event.imageUrl;
      if (!content && !imageUrl) {
        return;
      }

      const currentPosts = store.posts();
      const nextId = currentPosts.length ? Math.max(...currentPosts.map((post) => post.id)) + 1 : 1;
      const { email: _email, userName: _userName, ...author } = user;

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

      setPosts(store, [newPost, ...currentPosts]);
    },
    toggleLike(postId: number): void {
      const updatedPosts = store.posts().map((post) => {
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
      setPosts(store, updatedPosts);
    },
    toggleSave(postId: number): void {
      const updatedPosts = store.posts().map((post) =>
        post.id === postId
          ? {
              ...post,
              saved: !post.saved,
            }
          : post,
      );
      setPosts(store, updatedPosts);
    },
    toggleRepost(postId: number): void {
      const updatedPosts = store.posts().map((post) => {
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

      setPosts(store, updatedPosts);
    },
    addComment(event: { postId: number; content: string }, user: UserInterface = currentUser): void {
      const normalizedContent = event.content.trim();
      if (!normalizedContent) {
        return;
      }

      const allCommentIds = store.posts().flatMap((post) => post.comments.map((comment) => comment.id));
      const nextCommentId = allCommentIds.length ? Math.max(...allCommentIds) + 1 : 1;
      const { email: _email, userName: _userName, ...author } = user;

      const newComment: CommentInterface = {
        id: nextCommentId,
        author,
        content: normalizedContent,
        text: normalizedContent,
        createdAt: 'ahora',
      };

      const updatedPosts = store.posts().map((post) =>
        post.id === event.postId
          ? {
              ...post,
              comments: [...post.comments, newComment],
            }
          : post,
      );

      setPosts(store, updatedPosts);
    },
  })),
);
