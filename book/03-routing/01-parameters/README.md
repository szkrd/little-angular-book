# Route parameters

- `:id` → `{path: 'post/:id', component: PostPageComponent}`
- don't forget to unsubscribe on component destroy!

**Subscribing** to parameter **changes** with `ActivatedRoute` service from `@angular/router`:

```typescript
ngOnInit() {
  this.routeChangeSubscription = this.activatedRoute
    .paramMap
    .subscribe(params => {
      this.id = Number(params.get('id'));
      this.getPost();
    });
}
```

Or if we need only a single immutable snapshot, then: `this.activatedRoute.snapshot.params.id;`  
(if you only want to support page reload, but everything else happens inside the app, then just get the params in `ngOnInit`).

Opening links from the template using the `routerLink` directive:

```html
<a [routerLink]="['/view/post', item.id]">
  {{ item.title }}
</a>
```

Opening links from the component class,  
using `{Router}` from `@angular/router`:

```typescript
this.router.navigate(['/view/post', { id: item.id }]);
```

## The current route

The current route is available via `ActivatedRoute`, which has observables to allow us to listen for changes.

paramMap, queryParamMap, parent, data, url, etc.
official list is [here](https://angular.io/guide/router#activated-route).

## Router lifecycle

Router emits all its events (list can be found [here](https://angular.io/guide/router#router-events)):

```typescript
ngOnInit() {
  this.router.events
    .subscribe((event) => {
      // example: NavigationStart, RoutesRecognized, NavigationEnd
      console.log(event);
    });
}
```

