import { HandledRoute, registerPlugin } from '@scullyio/scully';
import { readFileSync } from 'fs';
const marked = require('marked');

import { JSDOM } from 'jsdom';
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
const { document } = window;

/**
 * Nom du plugin
 */
export const TOC_NAME = 'toc';

/**
 * Plugin TOC (Table Of Content)
 */
const tocPlugin: any = async (html: string, route: HandledRoute) => {
  const headingIds = getHeadings(
    readFileSync(route.templateFile, 'utf-8').toString()
  );
  const toc = `<div id="toc-doc"><ul>${headingIds
    .map(createLi)
    .join('')}</ul></div>`;
  const heads = headingIds.map((h) => h[1]);
  const last = heads.pop();
  const desc = `Scully documentation page containing ${heads.join(
    ','
  )} and ${last}`;

  return html
    .replace('id="test">', 'id="test">' + toc)
    .replace('</head>', `<meta name="description" content="${desc}"></head>`);

  function createLi([id, desc]) {
    return `
      <li><a href="#${id}">${desc}</a></li>`;
  }
};

function getHeadings(content: string): [string, string][] {
  const exceptions = [
    '#heading 1 ### subheading 1 ## heading 2 ### subheading 2',
  ].map((e) => e.trim().toLowerCase());
  return content
    .split('\n')
    .filter(
      (line) =>
        line.startsWith('#') &&
        !exceptions.some((exception) => line.toLowerCase().includes(exception))
    )
    .map((line) => {
      const outer = document.createElement('div');
      outer.innerHTML = marked(line.trim());
      const elm = outer.firstChild;
      try {
        // extract Id
        const id = elm['id'] as string;
        const desc = elm.textContent;
        return [id, desc];
      } catch (e) {
        console.log('oops', e);
        return ['', ''];
      }
    });
}

/**
 * Enregistrement du plugin.
 *
 * L'enregistrement sera effectif pour un projet lorsque ce fichier sera importé dans
 * le fichier de configuration Scully du projet (scully.<nom-du-projet>.config.ts).
 */
registerPlugin('render', TOC_NAME, tocPlugin);
