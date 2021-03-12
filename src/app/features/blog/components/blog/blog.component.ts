import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isScullyRunning } from '@scullyio/ng-lib';
import ClipboardJS from 'clipboard';

import { Post } from 'src/app/core/model/post';
import { TableOfContentsService } from 'src/app/core/services/table-of-contents.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogComponent implements OnInit {
  post: Post;
  isScullyRunning: boolean = isScullyRunning();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tocService: TableOfContentsService
  ) {
    this.route.data.subscribe(
      (data: { post: Post }) => {
        this.post = data.post;
        this.tocService.updateTocContent(data.post.content);
      }
    );
  }

  ngOnInit(): void {
    const clipboard = new ClipboardJS('.btn');

    clipboard.on('success', (e) => e.clearSelection());

    clipboard.on('error', (e) => {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });
  }

  onError() {
    this.router.navigate(['/']);
  }

}
