{% raw %}
# Route parameters

- `:id` → `{path: 'post/:id', component: PostPageComponent}`
- don't forget to unsubscribe on component destroy!

Subscribing to parameter changes  
with `ActivatedRoute` service from `@angular/router`:

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

Opening links from the template  
using the `routerLink` directive:

```angular2html
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
{% endraw %}
