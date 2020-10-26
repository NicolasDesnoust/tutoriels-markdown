import { Post } from 'src/app/features/posts/model/post';

export class Category {
  id: string;
  label: string;
  posts: Post[];
}
