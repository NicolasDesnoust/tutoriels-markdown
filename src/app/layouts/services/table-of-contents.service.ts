import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import * as toc from "markdown-toc-unlazy";

export type TocHeader = { content: string; slug: string; lvl: number };

@Injectable({
  providedIn: "root",
})
export class TableOfContentsService {
  /**
   * Stocke le contenu de la table des matières.
   */
  private _tocContentSubject = new BehaviorSubject<TocHeader[]>([]);

  constructor() {}

  get tocContent$(): Observable<TocHeader[]> {
    return this._tocContentSubject.asObservable();
  }

  updateTocContent(markdownData: string) {
    const result: TocHeader[] = toc(markdownData, { slugify: require("uslug") })
      .json;
    this._tocContentSubject.next(result);
  }

  clearTocContent() {
    this._tocContentSubject.next([]);
  }
}
