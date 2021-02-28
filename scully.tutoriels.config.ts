import {
  RouteTypes,
  ScullyConfig,
  setPluginConfig,
} from '@scullyio/scully';

// Core Plugins
// import { criticalCSS } from '@scullyio/scully-plugin-critical-css';
import { docLink } from '@scullyio/scully-plugin-docs-link-update';
const { MinifyHtml } = require('scully-plugin-minify-html');

// Community Plugins
// import { CopyToClipboard } from '@scullyio/scully-plugin-copy-to-clipboard';
const {
  getFlashPreventionPlugin,
} = require('@scullyio/scully-plugin-flash-prevention');

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

/* -------------------------------------------------------------------------- */
/*                   Configuration de Scully pour le projet                   */
/* -------------------------------------------------------------------------- */

const defaultPostRenderers = [
  'seoHrefOptimise',
  // criticalCSS,
  // CopyToClipboard,
  getFlashPreventionPlugin({ appRootSelector: 'app-root' }),
  THEME_APPLIER_NAME,
  MinifyHtml
];

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'tutoriels',
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
      postRenderers: [...defaultPostRenderers]
    },
  },
  puppeteerLaunchOptions: {
    // executablePath:
    //   'C:\\Users\\desno\\AppData\\Local\\Chromium\\Application\\chrome.exe',
  },
};