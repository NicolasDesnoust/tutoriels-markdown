import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Injector,
} from '@angular/core';
import { CopyButtonComponent } from '../components/copy-button/copy-button.component';

@Directive({
  selector: '[addCodeHeaders]',
})
export class AddCodeHeadersDirective {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private element: ElementRef<HTMLElement>
  ) {}

  @HostListener('ready')
  public processAnchors() {
    this.element.nativeElement
      .querySelectorAll('div[id^="code-"]')
      .forEach((div) => {
        const parent = div.parentElement;
        if (parent) {
          const container = this.document.createElement('div');
          const codeHeader = this.componentFactoryResolver
            .resolveComponentFactory(CopyButtonComponent)
            .create(this.injector, [], container);
          this.applicationRef.attachView(codeHeader.hostView);

          container.setAttribute('class', 'code-header');
          const parts = div.id.split('-');
          codeHeader.instance.counter = Number.parseInt(parts[1], 10);
          parent.insertBefore(container, div);
        }
      });
  }
}
