import { ScullyRoute } from "@scullyio/ng-lib";

export function filterNonBlogRoutes(scullyRoutes: ScullyRoute[]) {
  return scullyRoutes.filter((scullyRoute) => isABlogRoute(scullyRoute));
}

/**
 * Vérifie si une route de Scully est celle d'un post du blog.
 * 
 * Supporte les routes préfixées (en prod.):
 * /Desnote-book/blog/...
 * et les routes non-préfixées (en dev.):
 * /blog/...
 * 
 * @param scullyRoute 
 * @returns 
 */
export function isABlogRoute(scullyRoute: ScullyRoute): boolean {
  const regex: RegExp = new RegExp("\/?[^\/]*\/blog\/[^\/]*", "gm");
  return regex.test(scullyRoute.route);
}