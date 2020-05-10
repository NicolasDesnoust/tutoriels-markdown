import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  public postExists(title: string): Observable<boolean> {
    return this.http.get('http://localhost:4200/posts/' + title + '.md', { responseType: 'text' }).pipe(
      map(post => true),
      catchError(error => of(false))
    );
  }
}
