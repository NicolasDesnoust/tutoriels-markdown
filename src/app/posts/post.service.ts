import { Injectable } from '@angular/core';
import { 
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';


import { Post } from '../core/model/post';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class PostService {
  postsCollection: AngularFirestoreCollection<Post>
  postDoc: AngularFirestoreDocument<Post>

  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {
   /* this.postsCollection = this.afs.collection('tutoriels', ref =>
      ref.orderBy('published', 'desc')
    )*/
  }

  getPosts(): Observable<Post[]> {
    const post: Post = {
      id: "2020-05-07-comment-rendre-son-footer-responsive-en-css",
      title: "Comment rendre son footer responsive en CSS ?",
      description: "Découvrez comment faire en sorte que le contenu en bas de page se positionne de manière responsive, et ce uniquement en CSS !",
      image: 'miniature-css-trans.png',
      published: "05/07/2020",
      author: "Nicolas Desnoust",
      authorId: "nicolas-desnoust",
      tags: [
      "css",
      "footer",
      "responsive",
      "html"
      ], 
      category: "css"
    };

    const post2: Post = {
      id: "2020-05-07-dev-api-rest-avec-spring",
      title: "Développement d'une API REST avec Spring",
      description: "Construisez et déployez votre propre API REST à partir de technologies robustes, principalement basées sur le language Java.",
      image: 'miniature-spring-trans.png',
      published: "05/07/2020",
      author: "Nicolas Desnoust",
      authorId: "nicolas-desnoust",
      tags: [
      "css",
      "footer",
      "responsive",
      "html"
      ], 
      category: "spring"
    };

    return of([post, post2]);
    //return this.postsCollection.valueChanges({ id: 'id' });
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

  getPostData(title: string) {
    this.postDoc = this.afs.doc<Post>(`posts/${title}`)
    return this.postDoc.valueChanges()
  }

  getPost(title: string) {
    return this.afs.doc<Post>(`posts/${title}`)
  }

  create(data: Post) {
    this.postsCollection.add(data)
  }

  delete(title: string) {
    return this.getPost(title).delete()
  }

  update(title: string, formData) {
    return this.getPost(title).update(formData)
  }
}