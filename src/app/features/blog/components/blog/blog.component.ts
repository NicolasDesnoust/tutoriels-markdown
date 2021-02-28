import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isScullyRunning } from '@scullyio/ng-lib';
import ClipboardJS from 'clipboard';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/core/model/post';
import { PostService } from 'src/app/core/services/post.service';
import { TableOfContentsService } from 'src/app/core/services/table-of-contents.service';

declare var ng: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogComponent {
  currentPost$: Observable<Post>;
  post$: Observable<string>;
  isScullyRunning: boolean = isScullyRunning();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private http: HttpClient,
    private tocService: TableOfContentsService
  ) {
    this.currentPost$ = this.postService.currentPost$;
  }

  ngOnInit(): void {
    const clipboard = new ClipboardJS('.btn');

    clipboard.on('success', (e) => e.clearSelection());

    clipboard.on('error', (e) => {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });

    this.post$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.http.get(`assets/blog/${params.get('slug')}`, {
          responseType: 'text',
        })
      )
    );
  }

  onError(error) {
    this.router.navigate(['/']);
  }

  onReady(markdownData: string) {
    setTimeout(() => {
      this.tocService.updateTocContent(markdownData);
    });
  }
}
