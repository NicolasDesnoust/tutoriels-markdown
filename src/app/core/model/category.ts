import { Post } from "./post";

export class Category {
  id: string;
  label: string;
  description: string;
  posts: Post[];
}
