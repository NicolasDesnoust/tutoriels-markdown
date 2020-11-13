import { DOCUMENT } from "@angular/common";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { toEnum } from "../util/enum-utils";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

@Injectable()
export class ThemeHandler {
  private _theme: Theme = null;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  get theme() {
    return this._theme;
  }

  /**
   * ! Cette méthode ne devrait être appelée que lors de l'intialisation de l'application.
   */
  applyThemeOnStartup(): Promise<void> {
    return new Promise((resolve, reject): void => {
      const savedTheme = localStorage.getItem("theme");
      console.log(`saved theme : ${savedTheme}`);
      const themeToApply = toEnum(Theme, savedTheme, Theme.LIGHT);
      console.log(themeToApply);
      this.updateTheme(themeToApply);
      resolve();
    });
  }

  updateTheme(theme: Theme) {
    if (theme != this.theme) {
      this._theme = theme;

      const bodyClassList = this.document.querySelector("body")!.classList;
      const removeClassList = /\w*-theme\b/.exec(bodyClassList.value);
      if (removeClassList) {
        bodyClassList.remove(...removeClassList);
      }
      console.log(`adding ${this._theme}-theme`);
      bodyClassList.add(`${this._theme}-theme`);
      localStorage.setItem("theme", this._theme);
    }
  }
}
