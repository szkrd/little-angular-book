# Observables

One can **subscribe** to observables (don't forget to unsubscribe in ngOnDestroy) and get their values one by one, all at once, combined, reduced, transformed etc.

In angular templates use the async pipe to create ad hoc subscriptions: `{{name$ | async}}`.

See [examples](01-examples/README.md).

## Observables vs subjects

**Observables:**

- **cold**: executed on (every) subscribe
- we can't change its value "from the outside" (uni-directional, unicast)
- ex.: `from(aPromise)`, `from(rxAjax)`...

**Subjects:**

- **hot**: "runs" even if there are no subscribers
- same data is shared among subscribers
- new values can be "added" in time (bi-directional, multicast)
- use `BehaviorSubject` if you need access to the last emitted value
- use `ReplaySubject` if you need access to all the values (replayed)

## Creating observables using shorthands

- of: `of(1, 2, 3)` = array-like list
- from: array-like, iterable (yields), collection (maps), promise, observable-like
  - `from([1, 2, 3])`
  - `from('abcdefg)` (a → b → c ... g)
  - `from(fetch('api/data'))`
- interval: `interval(1000)`
- event: `fromEvent(document, 'click')`
- ajax: `ajax('/api/data')` (import ajax from rxjs/ajax first)
- others: create, empty, generate, range, throw, timer
