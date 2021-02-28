const { registerPlugin } = require('@scullyio/scully');
import { minify, Options } from 'html-minifier';

const defaultMinifyOptions: Options = { 
    caseSensitive: true, 
    removeComments: true, 
    collapseWhitespace: true, 
    collapseBooleanAttributes: true, 
    removeRedundantAttributes: true, 
    useShortDoctype: true, 
    removeEmptyAttributes: true, 
    minifyCSS: true, 
    minifyJS: true, 
    removeScriptTypeAttributes: true, 
    removeStyleLinkTypeAttributes: true, 
    // don't remove attribute quotes, not all social media platforms can parse this over-optimization 
    removeAttributeQuotes: false, 
    // don't remove optional tags, like the head, not all social media platforms can parse this over-optimization 
    removeOptionalTags: false, 
};

export const minifyHtmlPlugin = (html, route) => { return minify(html, defaultMinifyOptions); };

export const MinifyHtml = 'minifyHtml'; 
registerPlugin('postProcessByHtml', MinifyHtml, minifyHtmlPlugin);