import { Post } from '../../feature-modules/posts/model/post';

export class Category {
    id: string;
    label: string;
    posts: Post[];
}
