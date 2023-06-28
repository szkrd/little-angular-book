# Examples

## Download from api

Let's download a list of my repositories and print the ones starting with the letter _"A"_. See how we have no ngOnInit, because the `async pipe` render "triggers a subscription".

Since the response is _one_ array with lot's of objects, we use `map` in the pipe and not `filter`.

In a "real" angular app we would use the angular's http service in our own service.

```typescript
import { Component } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface IRepo {
  name: string;
  id: number;
}

@Component({
  selector: 'app-github-repos',
  template: `
    <ul>
      <li *ngFor="let repo of repos$ | async">{{ repo.name }}</li>
    </ul>
  `,
})
export class GithubReposComponent {
  repos$: Observable<IRepo[]>;

  constructor() {
    this.repos$ = ajax
      .getJSON('https://api.github.com/users/szkrd/repos')
      .pipe(map((repos: IRepo[]) => repos.filter((repo) => /^a.*/.test(repo.name))));
  }
}
```

## Consecutive ajax calls

Get JSON from url-1, _then_ use a value from that response to download data from url-2.

```typescript
ajax.getJSON(url('/movie/top_rated')).pipe(
  tap((data: any) => console.log('Number of top rated items:', data.results.length)),
  map((data: any) => data.results[0]),
  tap((data: any) => console.log('Selected first movie:', data.id, data.title)),
  // "switch to a new observable"
  switchMap((data: any) => ajax.getJSON(url(`/movie/${data.id}`)))
);
```

## Parallel ajax calls

Here the observable returns responses as they arrive:

```typescript
const urls: string[] = ids.map((id) => url(`/movie/${id}`));
const concurrentCalls = 5;
return from(urls).pipe(mergeMap(ajax.getJSON, concurrentCalls));
```

### Parallel ajax calls merged

Similar to `Promise.all`, download two jsons and then convert the array into a nicer object:

```typescript
zip(ajax.getJSON(url('/movie/top_rated')), ajax.getJSON(url('/discover/movie'))).pipe(
  map(([topRated, discovered]: any[]) => ({
    topRated: topRated.results,
    discovered: discovered.results,
  }))
);
```

Just like Promise.all, this will fail if any of the calls fails.
To continue even then, add an error handler:

```typescript
const onError = (err: any) => {
  console.error(err);
  return of(err);
};
return zip(
  ajax.getJSON(url('/movie/top_rated')).pipe(catchError(onError)),
  ajax.getJSON(url('/discover/movie')).pipe(catchError(onError))
); //.pipe(...
```

## Computed observable

Add two numbers (a$ and b$) using the two observables' latest value:  
`combineLatest` will create an array `[a, b]` then we pipe & map that to `arr[0] + arr[1]`

```typescript
@Component({
  selector: 'app-add',
  template: `
    <p>
      <label>A <input type="number" (change)="updateA($event)" [value]="a$ | async" /></label>
      +
      <label>B <input type="number" (change)="updateB($event)" [value]="b$ | async" /></label>
      = {{ sum$ | async }}
    </p>
  `,
})
export class AddComponent {
  a$ = new BehaviorSubject(-10);
  b$ = new BehaviorSubject(10);
  sum$ = combineLatest(this.a$, this.b$).pipe(map((x) => x[0] + x[1]));
  updateA($event) {
    this.a$.next(parseInt($event.target.value, 10));
  }
  updateB($event) {
    this.b$.next(parseInt($event.target.value, 10));
  }
}
```
