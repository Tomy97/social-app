import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[iconFill]',
  standalone: true,
})
export class IconFillDirective implements OnChanges {
  @Input() iconFill: string = 'none';

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    const svg = this.el.nativeElement.querySelector('svg');
    if (svg) {
      svg.setAttribute('fill', this.iconFill);
    }
  }
}
