import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-colored-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [style.color]="color">
      <span class="tooltip"><ng-content select="[tooltip]"></ng-content></span>
      <span class="text"><ng-content select="[text]"></ng-content></span>
<!--      <ng-content select="[title]='foobar'"></ng-content>-->
<!--      <span #slot><ng-content></ng-content></span>-->
<!--      <ng-container *ngIf="!slot.hasChildNodes()">default text</ng-container>-->
    </span>
  `,
  styles: [`
    .tooltip:not(:empty) { background-color: burlywood; position: absolute; border: 1px solid black; display: none; }
    :host:hover .tooltip { display: block; }
  `]
})
export class ColoredTextComponent {
  @Input() color = 'black';
}
