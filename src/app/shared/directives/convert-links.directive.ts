import {
  Directive,
  ElementRef,
  Injector,
  ApplicationRef,
  ComponentFactoryResolver,
  Component,
  Input,
  Inject,
  HostListener,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  template: `<a routerLink="." fragment="{{ href }}">
    <img src="assets/images/link-24px.svg" class="header-link" />
  </a>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouterLinkComponent {
  @Input() public href: string;
  @Input() public text: string;
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[testDir]',
})
export class ConvertLinksDirective {
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
      .querySelectorAll('a[routerLink]')
      .forEach((a) => {
        const parent = a.parentElement;
        if (parent) {
          const container = this.document.createElement('span');
          const component = this.componentFactoryResolver
            .resolveComponentFactory(RouterLinkComponent)
            .create(this.injector, [], container);
          this.applicationRef.attachView(component.hostView);
          component.instance.href = a.getAttribute('routerLink') || '';
          component.instance.text = a.textContent || '';
          parent.replaceChild(container, a);
        }
      });
  }
}
