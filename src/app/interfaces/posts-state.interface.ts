import { PostInterface } from "./post.interface";
import { CommentInterface } from "./comment.interface";

export interface PostsStateInterface {
  posts: PostInterface[];
  comments: CommentInterface[];
  loading: boolean;
  error: string | null;
}
