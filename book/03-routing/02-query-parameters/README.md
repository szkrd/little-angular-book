# Query parameters

- for example: `view/posts?page=2&q=porro`
- not shown in the route definition
- don't forget to unsubscribe on component destroy!

Subscribing to parameter changes  
with `ActivatedRoute` service from `@angular/router`:

```typescript
ngOnInit() {
  this.routeChangeSubscription = this.activatedRoute
    .queryParamMap
    .subscribe((params) => {
      this.text = (params.get('q') || '').trim();
      this.page = Number(params.get('page')) || 1;
      this.searchForPosts();
    });
}
```

Opening links from the template  
using the `routerLink` directive:

```html
<a [routerLink]="['/posts']" [queryParams]="{q: searchText}">
  {{searchText}}
</a>
```

Opening links from the component class,  
using `{Router}` from `@angular/router`:

```typescript
this.router.navigate(['view/posts'], {
  queryParams: {q: this.searchText}
});
```

## Combining parameters and query parameters

:bulb: Sometimes you want to listen for query param and param change (probably with more complex pages) together.  
Use `combineLatest` (from _rxjs/observable/combineLatest_) to get them both:

```typescript
combineLatest(
  this.activatedRoute.queryParamMap,
  this.activatedRoute.paramMap
).subscribe(this.onRouteAnyParamChange);
```

The bound `onRouteAnyParamChange` will accept an array param, the first item is the queryParam map, the second is the param map.


