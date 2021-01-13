import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { routeAnimations } from './core/animations/route.animations';

@Component({
  selector: 'app-root',
  template: `<div
    [@routeAnimations]="
      o.isActivated &&
      o.activatedRoute.routeConfig.data &&
      o.activatedRoute.routeConfig.data.title
    "
  >
    <router-outlet #o="outlet"></router-outlet>
  </div>`,
  styles: [':host { display: block; height: 100% }'],
  animations: [routeAnimations],
})
export class AppComponent implements OnInit {
  private title = 'Tutoriels | N&V';

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {
        name: 'keywords',
        content: 'Tutoriels, Github, Desnoust, Niaba, Spring, Java, JEE',
      },
      {
        name: 'description',
        content:
          'Tutoriels portant sur différentes techonlogies du web : Java, Jakarta EE, Spring, HTML, SCSS, ...',
      },
      { name: 'robots', content: 'index, follow' },
    ]);
  }
}
