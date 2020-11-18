import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { toEnum } from '../../util/enum-utils';
import { BaseStartupService } from './base-startup.service';
import { Logger } from './logger.service';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

/**
 * Service responsable des thèmes de l'application.
 */
@Injectable()
export class ThemeHandler extends BaseStartupService {
  private _theme: Theme = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private logger: Logger
  ) {
    super();
  }

  get theme() {
    return this._theme;
  }

  load(): Observable<void> {
    const savedTheme = localStorage.getItem('theme');
    this.logger.info(`saved theme : ${savedTheme}`);
    const themeToApply = toEnum(Theme, savedTheme, Theme.LIGHT);
    // this.logger.info(themeToApply);
    // this.logger.trace(`trace log`, this, null);
    // this.logger.info("working !");
    this.updateTheme(themeToApply);
    return of(null); // TODO: change return type
  }

  updateTheme(theme: Theme) {
    if (theme !== this.theme) {
      this._theme = theme;

      const bodyClassList = this.document.querySelector('body').classList;
      const removeClassList = /\w*-theme\b/.exec(bodyClassList.value);
      if (removeClassList) {
        bodyClassList.remove(...removeClassList);
      }
      console.log(`adding ${this._theme}-theme`);
      bodyClassList.add(`${this._theme}-theme`);
      localStorage.setItem('theme', this._theme);
    }
  }
}
