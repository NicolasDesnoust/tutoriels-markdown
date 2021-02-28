import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConvertLinksDirective } from './directives/convert-links.directive';
import { CopyButtonComponent } from './components/copy-button.component';
import { ClipboardModule } from 'ngx-clipboard';
import { AddCodeHeadersDirective } from './directives/add-code-headers.directive';
import { AutosizeModule } from 'ngx-autosize';
import { FeatherModule } from './modules/feather.module';
import { RouterLinkComponent } from './components/router-link.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardSliderComponent } from './components/card-slider/card-slider.component';
import { CardComponent } from './components/card/card.component';

// Contient les composants partagés
const COMPONENTS = [
  RouterLinkComponent,
  CopyButtonComponent,
  CardListComponent,
  CardComponent,
  CardSliderComponent
];

// Contient les pipes partagés
const PIPES = [];

// Contient les directives partagées
const DIRECTIVES = [
  ConvertLinksDirective,
  AddCodeHeadersDirective,
];

const MODULES = [
  MaterialModule,
  FeatherModule,
  CommonModule,
  FormsModule,
  RouterModule,
  ReactiveFormsModule,
  ClipboardModule,
  AutosizeModule,
];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES, ...DIRECTIVES, CardComponent],
  imports: [...MODULES],
  exports: [...DIRECTIVES, ...COMPONENTS, ...PIPES, ...MODULES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
