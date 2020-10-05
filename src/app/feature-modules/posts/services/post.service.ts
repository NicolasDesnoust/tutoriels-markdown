import { Observable } from "rxjs";
import { Post } from "../model/post";

export interface PostService {
  getPosts(): Observable<Post[]>;
  getPost(id: string): Observable<Post>;
}
