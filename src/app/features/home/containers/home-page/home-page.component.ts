import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  links: Array<{ text: string; path: string }> = [];

  constructor() {
    this.links.push({
      text: "API REST avec Spring",
      path: "/tutoriels/spring/2020-05-07-dev-api-rest-avec-spring",
    });
    this.links.push({
      text: "Footer responsive en CSS",
      path:
        "/tutoriels/css/2020-05-07-comment-rendre-son-footer-responsive-en-css",
    });
  }

  ngOnInit(): void {}
}
