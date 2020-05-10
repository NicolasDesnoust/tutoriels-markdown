import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tutoriels de Nico & Vicky';
  repositoryUrl = "#";
  showProjectPage = true;

  links = ["CSS", "JS", "JAVA", "HTML"];

  folders= [{ name:"crfefre", updated:"dzefdezdf"}, { name:"crfefre", updated:"dzefdezdf"}, { name:"crfefre", updated:"dzefdezdf"}];
  notes= [{ name:"crfefre", updated:"dzefdezdf"}, { name:"crfefre", updated:"dzefdezdf"}, { name:"crfefre", updated:"dzefdezdf"}];


}
