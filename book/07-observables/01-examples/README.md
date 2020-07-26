# Examples

## Download from api

Let's download a list of my repositories and print the ones starting with the letter _"A"_.

Since the response is _one_ array with lot's of objects, we use `map` in the pipe and not `filter`.

In a "real" angular app we would use the angular's http service in our own service.

```typescript
import {Component, OnInit} from '@angular/core';
import {ajax} from 'rxjs/ajax';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

interface IRepo { name: string; id: number; }

@Component({
  selector: 'app-github-repos',
  template: `
    <ul>
      <li *ngFor="let repo of repos$ | async">{{ repo.name }}</li>
    </ul>
  `
})
export class GithubReposComponent implements OnInit {
  repos$: Observable<IRepo[]>;

  constructor() {
    this.repos$ = ajax.getJSON('https://api.github.com/users/szkrd/repos')
      .pipe(map((repos: IRepo[]) => repos.filter(repo => /^a.*/.test(repo.name))));
  }

  ngOnInit(): void {
    this.repos$.subscribe(); // since an observable is cold, this will "start" it
  }
}
```

## Computed observable

Add two numbers (a$ and b$) using the two observables' latest value:  
`combineLatest` will create an array `[a, b]` then we pipe & map that to `arr[0] + arr[1]`

```typescript
@Component({
  selector: 'app-add',
  template: `
    <p>
      <label>A <input type="number" (change)="updateA($event)" [value]="a$ | async"></label>
      +
      <label>B <input type="number" (change)="updateB($event)" [value]="b$ | async"></label>
      = {{sum$ | async}}
    </p>
  `
})
export class AddComponent {
  a$ = new BehaviorSubject(-10);
  b$ = new BehaviorSubject(10);
  sum$ = combineLatest(this.a$, this.b$).pipe(map(x => x[0] + x[1]));
  updateA($event) { this.a$.next(parseInt($event.target.value, 10)); }
  updateB($event) { this.b$.next(parseInt($event.target.value, 10)); }
}
```
