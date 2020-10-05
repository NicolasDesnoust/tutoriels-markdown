import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore,
} from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";

import { Post } from "src/app/feature-modules/posts/model/post";
import { PostService } from "./post.service";

export class FirebasePostService {//implements PostService {
  // postsCollection: AngularFirestoreCollection<Post>;
  // postDoc: AngularFirestoreDocument<Post>;

  // constructor(
  //   private afs: AngularFirestore,
  //   private afStorage: AngularFireStorage
  // ) {
  //   this.postsCollection = this.afs.collection("tutoriels", (ref) =>
  //     ref.orderBy("published", "desc")
  //   );
  // }

  // getPosts(): Observable<Post[]> {
  //   return this.postsCollection.valueChanges({ id: "id" });
  //   /*.pipe(
  //     map(actions => {
  //       return actions.map(a => {
  //         const data = a.payload.doc.data() as Post
  //         const title = a.payload.doc.id
  //         return { title, ...data }
  //       })
  //     })
  //   )*/
  // }

  // // getPostData(title: string) {
  // //   this.postDoc = this.afs.doc<Post>(`posts/${title}`);
  // //   return this.postDoc.valueChanges();
  // // }

  // getPost(title: string): Observable<Post> {
  //   return this.afs.doc<Post>(`posts/${title}`).valueChanges();
  // }

  // // create(data: Post) {
  // //   this.postsCollection.add(data);
  // // }

  // // delete(title: string) {
  // //   return this.getPost(title).delete();
  // // }

  // // update(title: string, formData) {
  // //   return this.getPost(title).update(formData);
  // // }
}
