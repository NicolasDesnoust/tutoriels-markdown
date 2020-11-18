import { Injectable } from '@angular/core';
import { MarkedRenderer } from 'ngx-markdown';
const uslug = require('uslug');

@Injectable({
  providedIn: 'root',
})
export class MarkdownRenderer extends MarkedRenderer {
  private counter = 0;

  constructor() {
    super();
  }

  code(code: string, language: string, isEscaped: boolean) {
    const codeHTML = `<div id='code-${
      this.counter
    }'>${new MarkedRenderer().code(code, language, isEscaped)}</div>`;
    this.counter++;

    return codeHTML;
  }

  heading(text: string, level: number) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    const id = uslug(text);

    return (
      '<h' +
      level +
      ' id="' +
      id +
      '">' +
      '<a name="' +
      escapedText +
      '" class="anchor" routerLink="' +
      id +
      '">' +
      '<img src="assets/images/link-24px.svg" class="header-link"></img>' +
      '</a>' +
      text +
      '</h' +
      level +
      '>'
    );
  }
}
