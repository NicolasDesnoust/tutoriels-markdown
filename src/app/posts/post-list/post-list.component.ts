import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/storage';

import { Post } from 'src/app/core/model/post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts: Observable<Post[]>;

  constructor(
    private postService: PostService,
    private afStorage: AngularFireStorage
  ) {
    this.posts = this.postService.getPosts();

    this.posts.subscribe(posts => {
      console.log(posts);

      posts.forEach(post => {
        /*this.afStorage.ref(post.image).getDownloadURL().subscribe(url => {
          console.log(url);
          post.image = url
        });*/
      });
    });
  }

  ngOnInit(): void {
  }

}
