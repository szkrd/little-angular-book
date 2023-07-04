import { Component } from '@angular/core';
import {ColoredTextComponent} from "./colored-text/colored-text.component";

@Component({
  selector: 'app-standalone-button',
  templateUrl: './standalone-button.component.html',
  styleUrls: ['./standalone-button.component.scss'],
  standalone: true,
  imports: [ColoredTextComponent],
})
export class StandaloneButtonComponent {}
