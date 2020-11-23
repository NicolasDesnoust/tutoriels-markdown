import { Observable, of } from 'rxjs';

import { PostService } from './post.service';
import { Injectable } from '@angular/core';
import { Post } from '../model/post';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/core/services/startup/config.service';

@Injectable()
export class LocalPostService implements PostService {
  private rootUrl;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.rootUrl = `${this.configService.configuration.serverUrl}/posts`;
  }

  savePost(post: Post): Observable<any> {
    if (post.id) {
      return this.http.put<Post>(`${this.rootUrl}/${post.id}`, post);
    } else {
      return this.http.post<Post>(this.rootUrl, post);
    }
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.rootUrl);
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.rootUrl}/${id}`);
  }
}
