import { ScullyRoute } from "@scullyio/ng-lib";

import { Category } from "./category";

export interface Post {
   content: string;
   metadata: PostMetadata;
}

export interface PostMetadata extends ScullyRoute {
   category: Category;
   createdAt: Date;
   description: string;
}
