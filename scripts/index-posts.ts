import fs from 'fs';
import algoliasearch from 'algoliasearch';
import { PostMetadata } from 'src/app/core/model/post';

if (process.argv.length < 3) {
  throw new Error(
    `Please provide an Algoria admin api key.
     Usage: npm run index-posts -- <ADMIN_API_KEY>`
  );
}

const APPLICATION_ID = 'W1EFSZBSFF';
const ADMIN_API_KEY = process.argv[2];
const ROUTES_FILE_PATH = 'src/assets/scully-routes.json';

const client = algoliasearch(APPLICATION_ID, ADMIN_API_KEY);
const index = client.initIndex('posts');

type AlgoliaRecord = PostMetadata & { objectID?: string };

/**
 * Read scullyRoutes.json and index blog routes in Algolia Search.
 */
fs.readFile(ROUTES_FILE_PATH, (fileErr, data) => {
  if (fileErr) {
    console.error(fileErr);
  } else {
    const routes: AlgoliaRecord[] = JSON.parse(data.toString());
    const blogRoutes = routes.filter((route) =>
      route.route.startsWith('/blog/')
    );

    blogRoutes.forEach((blogRoute) => {
      blogRoute.objectID = removeFileExtension(blogRoute.sourceFile);
    });

    index.addObjects(blogRoutes, (indexErr, content) => {
      if (indexErr) {
        console.error(indexErr);
      } else {
        console.log('Successfully indexed all posts : ');
        console.log(content);
      }
    });
  }
});

// <file-name>.md -> <file-name>
function removeFileExtension(sourceFile: string): string {
  return sourceFile.substring(0, sourceFile.length - 3);
}
