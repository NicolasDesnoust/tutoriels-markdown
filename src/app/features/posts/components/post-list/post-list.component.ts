import { Component, Inject, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { Post } from '../../model/post';
import { LocalPostService } from '../../services/local-post.service';
import { PostService } from "../../services/post.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"],
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(
    // TODO: Use Symbols
    @Inject("PostService") private postService: PostService
  ) {
    this.posts$ = this.postService.getPosts();
    /*this.posts$.subscribe((posts) => {
      posts.forEach((post) => {
        this.afStorage.ref(post.image).getDownloadURL().subscribe(url => {
          console.log(url);
          post.image = url
        });
      });
    });*/
  }

  ngOnInit(): void {}
}
