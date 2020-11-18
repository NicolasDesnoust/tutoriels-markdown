import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TableOfContentsService } from 'src/app/core/services/table-of-contents.service';
import { MEDIAQUERIES, MONITOR_MEDIAQUERY } from 'src/data/mediaqueries';
import { Post } from '../../model/post';
import { PostService } from '../../services/post.service';

declare var ClipboardJS: any;

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  tags = [];
  post$: Observable<Post>;

  private layoutChangesSubscription: Subscription;
  showTableOfContents = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private tocService: TableOfContentsService,
    @Inject('PostService') private postService: PostService
  ) {}

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    const clipboard = new ClipboardJS('.btn');

    clipboard.on('success', (e) => {
      // console.info('Action:', e.action);
      // console.info('Text:', e.text);
      // console.info('Trigger:', e.trigger);

      e.clearSelection();
    });

    clipboard.on('error', (e) => {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });

    this.post$ = this.route.paramMap.pipe(
      switchMap((params) => this.postService.getPost(params.get('id'))),
      map((post: Post) => {
        // post.content = JSON.parse(post.content);
        return post;
      })
    );

    this.layoutChangesSubscription = this.breakpointObserver
      .observe([...MEDIAQUERIES])
      .subscribe((state) => {
        this.showTableOfContents = !state.breakpoints[MONITOR_MEDIAQUERY];
      });
  }

  onError(error) {
    this.router.navigate(['/']);
  }

  onReady(markdownData: string) {
    this.tocService.updateTocContent(markdownData);
  }
}
