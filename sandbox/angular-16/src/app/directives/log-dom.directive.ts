import {Directive, ElementRef, OnDestroy, OnInit} from '@angular/core';

@Directive({
  selector: '[appLogDom]',
})
export class LogDomDirective implements OnInit, OnDestroy {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    console.log('element inserted into dom', this.el.nativeElement);
  }

  ngOnDestroy() {
    console.log('element removed from dom', this.el.nativeElement);
  }
}
