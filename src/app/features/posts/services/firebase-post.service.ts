import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Post } from '../model/post';
import { PostService } from './post.service';

@Injectable()
export class FirebasePostService implements PostService {
  readonly postCollectionId: string = 'posts';
  postCollection: AngularFirestoreCollection<Post>;
  postDoc: AngularFirestoreDocument<Post>;

  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {
    this.postCollection = this.afs.collection(this.postCollectionId, (ref) =>
      ref.orderBy('published', 'desc')
    );

    // const spr = {
    //   content: POSTS[1].content,
    // };
    // this.update("2020-05-07-dev-api-rest-avec-spring", spr);
    // const intro = {
    //   content: POSTS[3].content,
    // };
    // this.update(POSTS[3].id, intro);
    // this.create(POSTS[2]);
  }

  savePost(post: Post): Observable<Post> {
    throw new Error('Method not implemented.');
  }

  getPosts(): Observable<Post[]> {
    return this.postCollection
      .valueChanges({ id: 'id' })
      .pipe(tap((posts) => console.log('get posts :' + JSON.stringify(posts))));
    /*.pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post
          const title = a.payload.doc.id
          return { title, ...data }
        })
      })
    )*/
  }

  // getPostData(title: string) {
  //   this.postDoc = this.afs.doc<Post>(`posts/${title}`);
  //   return this.postDoc.valueChanges();
  // }

  getPost(title: string): Observable<Post> {
    console.log(`${this.postCollectionId}/${title}`);
    return this.afs
      .doc<Post>(`${this.postCollectionId}/${title}`)
      .valueChanges()
      .pipe(tap((post) => console.log('get post: ' + JSON.stringify(post))));
  }

  create(post: Post): Observable<void> {
    const postData: Omit<Post, 'id'> = Object.assign({}, post);
    delete postData['id'];

    const response = this.afs
      .collection(this.postCollectionId)
      .doc<Omit<Post, 'id'>>(post.id)
      .set(postData);

    return from(response);
  }

  // delete(title: string) {
  //   return this.getPost(title).delete();
  // }

  update(id: string, partialPost: Partial<Post>): Observable<void> {
    const response = this.afs
      .collection(this.postCollectionId)
      .doc<Post>(id)
      .update(partialPost);

    return from(response);
  }
}
