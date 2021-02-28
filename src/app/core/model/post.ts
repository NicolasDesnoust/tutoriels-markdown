import { ScullyRoute } from "@scullyio/ng-lib";

import { Category } from "./category";

export interface Post extends ScullyRoute {
   category: Category;
   createdAt: Date;
   description: string;
}
