import { ScullyRoute } from "@scullyio/ng-lib";

export function filterNonBlogRoutes(scullyRoutes: ScullyRoute[]) {
  return scullyRoutes.filter((scullyRoute) => isABlogRoute(scullyRoute));
}

export function isABlogRoute(scullyRoute: ScullyRoute): boolean {
  return scullyRoute.route.startsWith('/blog/');
}
