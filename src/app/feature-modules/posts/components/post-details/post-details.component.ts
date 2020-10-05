import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import {
  MEDIAQUERIES,
  MONITOR_MEDIAQUERY,
} from "src/app/layouts/data/mediaqueries";
import { TableOfContentsService } from "src/app/layouts/services/table-of-contents.service";
import { Post } from "../../model/post";
import { PostService } from "../../services/post.service";

declare var ClipboardJS: any;

@Component({
  selector: "app-post-details",
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.scss"],
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  title: string = "";
  category: string = "";
  tags = [];
  postUrl = "";
  post$: Observable<Post>;

  private layoutChangesSubscription: Subscription;
  showTableOfContents: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private tocService: TableOfContentsService,
    @Inject("PostService") private postService: PostService
  ) {}

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    const clipboard = new ClipboardJS(".btn");

    clipboard.on("success", function (e) {
      console.info("Action:", e.action);
      console.info("Text:", e.text);
      console.info("Trigger:", e.trigger);

      e.clearSelection();
    });

    clipboard.on("error", function (e) {
      console.error("Action:", e.action);
      console.error("Trigger:", e.trigger);
    });

    this.route.paramMap.subscribe((params) => {
      // no need to unsubscribe on destroy
      this.title = params.get("title");
      this.post$ = this.postService.getPost(this.title);
      this.category = params.get("category");
      this.postUrl = `posts/${this.title}.md`;
    });

    this.layoutChangesSubscription = this.breakpointObserver
      .observe([...MEDIAQUERIES])
      .subscribe((state) => {
        this.showTableOfContents = !state.breakpoints[MONITOR_MEDIAQUERY];
      });
  }

  onError(error) {
    this.router.navigate(["/"]);
  }

  onLoad(loadedData: string) {
    this.tocService.updateTocContent(loadedData);
  }
}
