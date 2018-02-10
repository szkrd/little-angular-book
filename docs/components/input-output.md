# Input / Output

in parent html:

```angular2html
<app-search-form
  [query]="queryString"
  (query-change)="onSearchFormChange($event)"
>
  Search for posts:
</app-search-form>
```

in child (a generic search-form) ts:

```typescript
// coming in via the [query] attribute
@Input('query') defaultQuery = '';

// fired up to parent as (query-change)  event
@Output('query-change') queryEmitter = new EventEmitter<string>();

// internals
query: FormControl;

// listen for changes and react to them
ngOnChanges (changes) {
  if (changes.defaultQuery) {
    this.query.setValue(this.defaultQuery);
  }
}
```

:exclamation: One can use getters and setters to emulate computed observable behaviour (eg. modify internal variable B when input A changes), but performance-wise it's NOT recommended.

:bomb: Circumventing an I/O interface:

1. Accessing a child's internals via referencing (` <app-timer #timer></app-timer>`) **from the parent template** is possible.
2. Or **from the parent class** itself with `@ViewChild`.

This technique _may_ be useful during component testing (creating a temporary wrapper component that can manipulate the subject's internals).

## Inter-component communication

Some of the popular approaches:

- via services (subject, behaviour subjects)
- common store ([ngrx](https://github.com/ngrx/store))
- eventbus ([eventemitters](https://nodejs.org/api/events.html))
- custom DOM events (see: bubbles and composed) 
