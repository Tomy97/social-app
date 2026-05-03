import { AuthorInterface } from "./author.interface";

export interface CommentInterface {
  id: number;
  author: AuthorInterface;
  content: string;
  text: string;
  createdAt: string;
}
