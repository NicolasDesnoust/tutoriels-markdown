import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      const value = this.localStorage.getItem(key);

      if (value != null) {
        return JSON.parse(value);
      }
    }

    return null;
  }

  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  clear() {
    if (this.isLocalStorageSupported) {
      localStorage.clear();
    }
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }
}
