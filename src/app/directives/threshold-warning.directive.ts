import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appThresholdWarning]'
})
export class ThresholdWarningDirective {

  @Input() appThresholdWarning: number | null = null;

  @HostBinding('class.overThreshold') overThreshold = false;

  @HostListener('input') inputHandler(): void {
    this.overThreshold = this.appThresholdWarning !== null && this.elementRef.nativeElement.valueAsNumber > this.appThresholdWarning;
  }

  constructor(private elementRef: ElementRef<HTMLInputElement>) {}


}
