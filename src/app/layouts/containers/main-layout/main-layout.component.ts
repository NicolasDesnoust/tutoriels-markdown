import { BreakpointObserver } from "@angular/cdk/layout";
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { Subscription } from "rxjs";
import {
  SMALLER_MONITOR_MEDIAQUERY,
  MONITOR_MEDIAQUERY,
  MEDIAQUERIES, MOBILE_MEDIAQUERY, TABLET_MEDIAQUERY
} from "../../data/mediaqueries";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;
  private layoutChangesSubscription: Subscription;
  showTableOfContents: boolean = true;

  showSideMenu: boolean = true;
  isOver: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([...MEDIAQUERIES])
      .subscribe((state) => {
        this.showSideMenu =
          state.breakpoints[SMALLER_MONITOR_MEDIAQUERY] ||
          state.breakpoints[MONITOR_MEDIAQUERY];
        this.isOver =
          state.breakpoints[MOBILE_MEDIAQUERY] ||
          state.breakpoints[TABLET_MEDIAQUERY];
        this.showTableOfContents = state.breakpoints[MONITOR_MEDIAQUERY];
      });
  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }
}
