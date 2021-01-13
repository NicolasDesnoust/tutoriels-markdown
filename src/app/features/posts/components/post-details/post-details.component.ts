import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'src/app/core/animations/route.animations';
import { TableOfContentsService } from 'src/app/core/services/table-of-contents.service';
import { UserService } from 'src/app/core/services/user.service';
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
  userLoggedIn$: Observable<boolean>;
  editMode = false;

  private layoutChangesSubscription: Subscription;
  showTableOfContents = true;

  form: FormGroup;
  
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private tocService: TableOfContentsService,
    private _fb: FormBuilder,
    private userService: UserService,
    @Inject('PostService') private postService: PostService
  ) {
    this.userLoggedIn$ = this.userService.isLoggedIn$();
  }

  get descriptionControl() {
    return this.form.controls.description as FormControl;
  }

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

    // this.post$ = this.route.paramMap.pipe(
    //   switchMap((params) => this.postService.getPost(params.get('id'))),
    //   map((post: Post) => {
    //     // post.content = JSON.parse(post.content);
    //     return post;
    //   })
    // );
    this.post$ = this.route.data.pipe(map((data: { post: Post }) => data.post));

    this.layoutChangesSubscription = this.breakpointObserver
      .observe([...MEDIAQUERIES])
      .subscribe((state) => {
        this.showTableOfContents = !state.breakpoints[MONITOR_MEDIAQUERY];
      });

    this.form = this._fb.group({
      title: new FormControl(''),
      description: new FormControl(),
    });

    this.post$.subscribe((post: Post) => {
      this.form.patchValue({ title: post.title, description: post.content });
    });
  }

  /**
   * Permet de basculer entre les modes edition et affichage
   */
  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  savePost(post: Post) {
    const formValue = this.form.value;
    post.content = formValue.description;
    post.title = formValue.title;
    this.postService.savePost(post).subscribe((result) => {
      this.editMode = false;
    });
  }

  onError(error) {
    this.router.navigate(['/']);
  }

  onReady(markdownData: string) {
    this.tocService.updateTocContent(markdownData);
  }
}
