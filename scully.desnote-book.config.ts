import { RouteTypes, ScullyConfig, setPluginConfig } from '@scullyio/scully';

// Core Plugins
// import { criticalCSS } from '@scullyio/scully-plugin-critical-css';
import { docLink } from '@scullyio/scully-plugin-docs-link-update';
import { MinifyHtml } from './scully/plugins/minifyHtmlPlugin';
import { baseHrefRewrite } from '@scullyio/scully-plugin-base-href-rewrite';

// Community Plugins
// import { CopyToClipboard } from '@scullyio/scully-plugin-copy-to-clipboard';
const {
  getFlashPreventionPlugin,
} = require('@scullyio/scully-plugin-flash-prevention');
import { timeToRead, timeToReadOptions } from 'scully-plugin-time-to-read';

// Custom Plugins
import './scully/plugins/theme-applier';
import { THEME_APPLIER_NAME } from './scully/plugins/theme-applier';
import './scully/plugins/category-routes-resolver';
import { CATEGORY_ROUTES_RESOLVER_NAME } from './scully/plugins/category-routes-resolver';
// import './scully/plugins/toc';

import 'prismjs/components/prism-java.js';
import 'prismjs/components/prism-properties.js';

/* -------------------------------------------------------------------------- */
/*                          Configuration des plugins                         */
/* -------------------------------------------------------------------------- */

setPluginConfig('md', { enableSyntaxHighlighting: true });
setPluginConfig(baseHrefRewrite, { href: '/Desnote-Book/' });
setPluginConfig(timeToRead, { path: '/blog' } as timeToReadOptions);

/* -------------------------------------------------------------------------- */
/*                   Configuration de Scully pour le projet                   */
/* -------------------------------------------------------------------------- */

const defaultPostRenderers = [
  // 'seoHrefOptimise',
  baseHrefRewrite,
  // criticalCSS,
  // CopyToClipboard,
  getFlashPreventionPlugin({ appRootSelector: 'app-root' }),
  THEME_APPLIER_NAME,
  // MinifyHtml
];

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'desnote-book',
  outDir: './dist/static',
  defaultPostRenderers,
  routes: {
    '/blog/:slug': {
      type: RouteTypes.contentFolder,
      postRenderers: [docLink, ...defaultPostRenderers],
      slug: {
        folder: './src/assets/blog',
      },
      manualIdleCheck: true,
    },
    '/categories/:id': {
      type: CATEGORY_ROUTES_RESOLVER_NAME,
      postRenderers: [...defaultPostRenderers],
    },
  },
  puppeteerLaunchOptions: {
    executablePath:
      // 'C:\\Users\\desno\\AppData\\Local\\Chromium\\Application\\chrome.exe',
  },
};
