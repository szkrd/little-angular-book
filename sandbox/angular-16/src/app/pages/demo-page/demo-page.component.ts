import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.scss'],
})
export class DemoPageComponent {
  today = 1688476095982;
  sectionVisible = true;
  userName$ = new Observable((obs) => {
    setTimeout(() => obs.next('John Doe'), 2000);
  });
}
