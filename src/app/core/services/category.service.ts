import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from '../model/category';
import { ConfigService } from './startup/config.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private rootUrl = 'http://localhost:3000/';
  
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.rootUrl = `${this.configService.configuration.serverUrl}/categories`;
  }

  public fetchCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.rootUrl);
  }
}
