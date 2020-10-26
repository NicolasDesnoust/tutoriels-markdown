import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../shared/material/material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MarkdownModule } from "ngx-markdown";
import { LoginComponent } from "./components/login/login.component";
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  LoginComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MarkdownModule.forChild(),
  ],
  exports: [...COMPONENTS],
})
export class CoreModule {}
