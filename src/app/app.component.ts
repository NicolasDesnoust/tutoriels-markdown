import { Component, OnInit } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { ThemeHandler } from './core/services/theme-handler.service';

@Component({
  selector: "app-root",
  template: ` <router-outlet></router-outlet> `,
  styles: [":host { display: block; height: 100% }"],
})
export class AppComponent implements OnInit {
  private title: string = "Tutoriels | N&V";

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      { name: "keywords", content: "Tutoriels, Github, Desnoust, Niaba, Spring, Java, JEE" },
      { name: "description", content: "Tutoriels portant sur différentes techonlogies du web : Java, Jakarta EE, Spring, HTML, SCSS, ..." },
      { name: "robots", content: "index, follow" },
    ]);
  }
}
