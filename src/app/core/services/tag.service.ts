import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  tags: string[] = ["spring", "css", "html"];

  constructor() { }

  public fetchTags(): string[] {
    return this.tags;
  }
}
