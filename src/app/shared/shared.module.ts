import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';
import { AutosizeModule } from 'ngx-autosize';

import { MaterialModule } from './modules/material.module';
import { FeatherModule } from './modules/feather.module';
import { ConvertLinksDirective } from './directives/convert-links.directive';
import { AddCodeHeadersDirective } from './directives/add-code-headers.directive';
import { CopyButtonComponent } from './components/copy-button.component';
import { RouterLinkComponent } from './components/router-link.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

// Contient les composants partagés
const COMPONENTS = [
  RouterLinkComponent,
  CopyButtonComponent,
  CardListComponent,
  PageHeaderComponent
];

// Contient les directives partagées
const DIRECTIVES = [
  ConvertLinksDirective,
  AddCodeHeadersDirective,
];

// Contient les modules partagés
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
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [...MODULES],
  exports: [...DIRECTIVES, ...COMPONENTS, ...MODULES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
