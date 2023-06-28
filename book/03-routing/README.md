# Routing

1. [Parameters](01-parameters/README.md)
2. [Query parameters](02-query-parameters/README.md)

- Angular uses `<base href="/">` in _index.html_
- html5 history by default
- info on the current route is available through subscriptions
- static link to a route with the `routerLink` directive:
  `<a routerLink="/profile" routerLinkActive="active">profile</a>`  
  (to set the active route's className, use the `routerLinkActive` directive)

_app.module.ts_

```typescript
@NgModule({
  // ...
  imports: [BrowserModule, AppRoutingModule],
  // ...
```

_app-routing.module.ts_

```typescript
const routes: Routes = [
  // redirection
  { path: '', redirectTo: 'view/posts', pathMatch: 'full' },
  // standalone page
  { path: 'profile', component: ProfilePageComponent },
  // child view (the sidebar with the widgets is shared)
  {
    path: 'view',
    component: ViewComponent,
    children: [
      { path: 'posts', component: PostsPageComponent },
      { path: 'post/:id', component: PostPageComponent },
    ],
  },
  // fallback
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
```

## Target outlets

- Target slot is `<router-outlet></router-outlet>` in the html template.
- Multiple outlets may be used (must for a child component)
- named router outlet: `<router-outlet name="sidebar"></router-outlet>`
