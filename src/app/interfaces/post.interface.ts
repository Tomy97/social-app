import { UserInterface } from "./user.interface";
import { CommentInterface } from "./comment.interface";

export interface PostInterface {
  id: number;
  author: Omit<UserInterface, 'email' | 'userName'>;
  content: string;
  imageUrl?: string;
  likes: number;
  liked: boolean;
  saved: boolean;
  comments: CommentInterface[];
  createdAt: string;
}
