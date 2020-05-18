import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { PostService } from 'src/app/posts/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit, AfterViewInit {
  title: string = "";
  category: string = "";
  tags = [];
  postFound = false;
  postUrl = "'posts/2020-05-07-comment-rendre-son-footer-responsive-en-css.md'";
  fragmentHandled: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { // no need to unsubscribe on destroy
      this.postFound = false;
      this.title = params.get('title');
      this.category = params.get('category');
      this.postFound = true;
      this.postUrl = `posts/${this.title}.md`;
      console.log(this.postUrl);
    });

    this.route.fragment.subscribe(fragment => { // no need to unsubscribe on destroy
      if(fragment && fragment.length != 0) {
        this.offsetAnchor(fragment);
      }
    });
  }

  ngAfterViewInit(): void {
   this.offsetAnchor('a');
  }

  // The function actually applying the offset
  offsetAnchor(target: string) {
    console.log("scrolling to " + target);
    
  }

  onError(error) {
    this.router.navigate(['/']);
  }
}

