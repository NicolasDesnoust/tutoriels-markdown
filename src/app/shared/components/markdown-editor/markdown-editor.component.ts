import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import '@github/markdown-toolbar-element'

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss']
})
export class MarkdownEditorComponent implements OnInit {

  @Input() control: FormControl;
  
  constructor() { }

  ngOnInit(): void {
    this.control = this.control ?? new FormControl();
  }

}
