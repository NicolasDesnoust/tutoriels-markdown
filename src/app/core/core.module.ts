import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../shared/material/material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MarkdownModule } from "ngx-markdown";
import { LoginComponent } from "./components/login/login.component";
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ThemeHandler } from './services/theme-handler.service';
import { throwIfAlreadyLoaded } from './module-import-guard';

const COMPONENTS = [
  LoginComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    FormsModule,
    MarkdownModule.forChild(),
  ],
  exports: [...COMPONENTS],
  providers: [ThemeHandler]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
