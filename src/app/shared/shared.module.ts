import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {
  ConvertLinksDirective,
  RouterLinkComponent,
} from "./directives/convert-links.directive";
import { CopyButtonComponent } from "./components/copy-button/copy-button.component";
import { ClipboardModule } from "ngx-clipboard";
import { AddCodeHeadersDirective } from "./directives/add-code-headers.directive";
import { EasyDividerComponent } from "./components/easy-divider/easy-divider.component";

// Contient les composants partagés
const COMPONENTS = [
  RouterLinkComponent,
  CopyButtonComponent,
  EasyDividerComponent
];

// Contient les pipes partagés
const PIPES = [];

// Contient les directives partagées
const DIRECTIVES = [ConvertLinksDirective, AddCodeHeadersDirective];

@NgModule({
  declarations: [COMPONENTS, PIPES, DIRECTIVES],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    ClipboardModule,
  ],
  exports: [
    DIRECTIVES,
    COMPONENTS,
    PIPES,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class SharedModule {}
