import {
  Component,
  OnInit,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [':host, app-root-scully { display: block; height: 100% }'],
})
export class AppComponent implements OnInit {
  private title = 'Desnote Book';

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {
        name: 'keywords',
        content: 'Desnote Book, Github, Desnoust, Nicolas, Spring, Java, JEE',
      },
      {
        name: 'description',
        content:
          'Notes personnelles portant sur différentes technologies du web : Java, Jakarta EE, Spring, HTML, SCSS, ...',
      },
      { name: 'robots', content: 'index, follow' },
    ]);
  }
}
