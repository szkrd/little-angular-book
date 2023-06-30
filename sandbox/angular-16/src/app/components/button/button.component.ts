import { Component, Input, ViewEncapsulation } from '@angular/core';

function toUpper(value: string) { return String(value).toUpperCase(); }

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  // standalone: true,
})
export class ButtonComponent {
  @Input({ required: true, transform: toUpper }) text!: string;
  // @Input('dog') cat: string = 'Fido';
}
