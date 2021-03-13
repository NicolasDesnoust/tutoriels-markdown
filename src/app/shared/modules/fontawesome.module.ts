import { NgModule } from '@angular/core';
import {
  FontAwesomeModule as AngularFontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faFacebookSquare,
  faLinkedin,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';

/* ----------------- Usage: <fa-icon icon="film"></fa-icon> ----------------- */

/* --- pour changer de style: <fa-icon [icon]="['far', 'film']"></fa-icon> -- */

/**
 * Setup fontawesome pour Angular:
 * https://www.angularjswiki.com/angular/how-to-use-font-awesome-icons-in-angular-applications
 *
 * Mises-à-niveau vers les dernières versions de fontawesome:
 * https://github.com/FortAwesome/angular-fontawesome/blob/master/UPGRADING.md
 */
@NgModule({
  imports: [AngularFontAwesomeModule],
  exports: [AngularFontAwesomeModule],
})
export class FontAwesomeModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faFacebookSquare, faTwitter, faLinkedin);
  }
}
