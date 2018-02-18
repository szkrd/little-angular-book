{% raw %}
# Routing

- use `<base href="/">` in html
- html5 history by default
- info on the current route is available through subscriptions

_app.module.ts_
```typescript
@NgModule({
  imports: [
    routing // from "app.routes.ts" below
  ],
  // ...
```
_app.routes.ts_
```typescript
const routes: Routes = [
  // redirection
  {path: '', redirectTo: 'view/posts', pathMatch: 'full'},
  // standalone page
  {path: 'profile', component: ProfilePageComponent},
  // child view (the sidebar with the widgets is shared)
  {
    path: 'view',
    component: ViewComponent,
    children: [
      {path: 'posts', component: PostsPageComponent},
      {path: 'post/:id', component: PostPageComponent}
    ]
  },
  // fallback
  {path: '**', component: PageNotFoundComponent}
];

export const routing = RouterModule.forRoot(routes);
```

## Target outlets

- Target slot is `<router-outlet></router-outlet>` in the html template.
- Multiple outlets may be used (must for a child component)
- named router outlet: `<router-outlet name="sidebar"></router-outlet>`
{% endraw %}
