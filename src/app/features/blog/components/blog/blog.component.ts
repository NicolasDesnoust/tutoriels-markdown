import { PlatformLocation } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  message = 'Lien copié dans le presse-papiers';
  url: string;
  window = window;

  getEncodedUrl() {
    return window.location.href;
  }

  getEncodedPostTitle() {
    return encodeURIComponent(this.post.metadata.title);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tocService: TableOfContentsService,
    private _snackBar: MatSnackBar,
    private platformLocation: PlatformLocation
  ) {
    this.route.data.subscribe((data: { post: Post }) => {
      this.post = data.post;
      this.tocService.updateTocContent(data.post.content);
    });

    const location = (this.platformLocation as any).location.toString();

    if (location.includes('#')) {
      const ind = location.indexOf('#');
      this.url = location.slice(0, ind);
    } else {
      this.url = location;
    }
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

  openSnackBar(message: string) {
    console.log(this.url);
    this._snackBar.open(message, null, {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-accent'],
    });
  }
}
