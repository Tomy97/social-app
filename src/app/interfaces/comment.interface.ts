import { UserInterface } from "./user.interface";

export interface CommentInterface {
  id: string;
  author: UserInterface;
  content: string;
  createdAt: string;
}
