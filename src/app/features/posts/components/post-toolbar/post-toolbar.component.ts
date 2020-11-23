import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post-toolbar',
  templateUrl: './post-toolbar.component.html',
  styleUrls: ['./post-toolbar.component.scss'],
})
export class PostToolbarComponent implements OnInit {
  @Input() showMarkdownToolbar = false;
  @Output() editModeEmitter = new EventEmitter<void>();
  @Output() validateChanges = new EventEmitter<void>();
  @Input() editMode = false;

  constructor() {}

  ngOnInit(): void {}

  onValidateClick() {
    this.validateChanges.emit();
  }

  onEditClick() {
    this.editMode = !this.editMode;
    this.editModeEmitter.emit();
  }
}
