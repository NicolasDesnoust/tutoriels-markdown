import { PostMetadata } from "./post";

export class Category {
  id: string;
  label: string;
  description: string;
  postsMetadata: PostMetadata[];
}
