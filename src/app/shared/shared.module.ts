import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Contient les composants partagés
const COMPONENTS = [
];

// Contient les pipes partagés
const PIPES = [
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    COMPONENTS,
    PIPES
  ],
  exports: [
    COMPONENTS,
    PIPES,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SharedModule { }
