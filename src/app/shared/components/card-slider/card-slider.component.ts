import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import KeenSlider from 'keen-slider';
import { MOBILE_MEDIAQUERY, TABLET_MEDIAQUERY } from 'src/data/mediaqueries';

@Component({
  selector: 'epu-card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss'],
})
export class CardSliderComponent
  implements OnDestroy, AfterViewInit, OnChanges {
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;
  @Input() options: any[] = [];
  @ContentChild(TemplateRef) template: TemplateRef<any> | undefined;
  slider: KeenSlider | null = null;
  private readonly SLIDES_PER_VIEW = 3.5;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      // while (this.options.length <= this.SLIDES_PER_VIEW) {
      //   this.options.push({ display: 'none' });
      // }
    }
  }

  ngAfterViewInit(): void {
    if (this.sliderRef) {

      // if (
      //   this.options?.length === Math.ceil(this.SLIDES_PER_VIEW) &&
      //   this.options[this.options?.length - 1]?.display === 'none'
      // ) {
      //   controls = false;
      // }
      setTimeout(() => this.initSlider(), 500);
    }
  }

  private initSlider() {
    console.log("slider creation");
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      slidesPerView: this.SLIDES_PER_VIEW,
      spacing: 15,
      breakpoints: {
        [MOBILE_MEDIAQUERY]: {
          slidesPerView: 1.5
        },
        [TABLET_MEDIAQUERY]: {
          slidesPerView: 1.5
        },
      },
    });
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }
}
