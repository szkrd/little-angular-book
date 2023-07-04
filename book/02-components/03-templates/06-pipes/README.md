# Pipes

Builtin pipes:

- date: `{{1688476095982 | date:'YYYY-MM-dd EEEE' }}` = _2023-07-04 Tuesday_ ([options](https://angular.io/api/common/DatePipe#usage-notes))
- uppercase: `{{'foo bar' | uppercase }}` = _FOO BAR_
- lowercase: `{{'FOO BAR' | lowercase }}` = _foo bar_
- currency: `{{15000000 | currency:'HUF' }}` = _HUF15,000,000.00_ (which is wrong)
- decimal: `{{15000000.12345 | number }}` = _15,000,000.123_ ([options](https://angular.io/api/common/DecimalPipe#digitsinfo))
- percent: `{{0.99 | percent}}` = _99%_
- async: `{{userName$ | async}}` with a minimal observable that sets the username to _John Doe_ in 2 seconds:  
  `userName$ = new Observable((obs) => { setTimeout(() => obs.next('John Doe'), 2000); });`  
  (with the async pipe, unsubscribe happens automatically).

A simple pipe with no parameters to emulate a `for` loop (created with `ng g pipe pipes/ForRange`):

```typescript
@Pipe({ name: 'forRange' })
export class ForRangePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): Iterable<number> {
    return new Array(parseInt(String(value ?? 0), 10)).fill('').map((val, idx) => idx);
  }
}
```

Usage: `<span *ngFor="let i of 10 | forRange">⭐</span>` - prints 10 stars.
