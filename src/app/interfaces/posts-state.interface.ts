import { PostInterface } from "./post.interface";

export interface PostsStateInterface {
  posts: PostInterface[];
  loading: boolean;
  error: string | null;
}
