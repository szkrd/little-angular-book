{% raw %}
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

```angular2html
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
{% endraw %}
