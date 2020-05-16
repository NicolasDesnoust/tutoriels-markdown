import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/posts/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  title: string = "";
  category: string = "";
  tags = [];
  postFound = false;
  postUrl = "'posts/2020-05-07-comment-rendre-son-footer-responsive-en-css.md'";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { // unsubscribe on destroy
      this.postFound = false;
      this.title = params.get('title');
      this.category = params.get('category');
      this.postFound = true;
      this.postUrl = `posts/${this.title}.md`;
      console.log(this.postUrl);
    });
  }

  onError(error) {
    this.router.navigate(['/']);
  }
}
   
   