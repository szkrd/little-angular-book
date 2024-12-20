
# Sharing services

The simplest use case for DI is to instanciate a service once and then give that instance (provide) to every component that needs it:

_app.module.ts_
```typescript
@NgModule({
  // ...
  declarations: [
    PostsPageComponent
  ],
  providers: [
    PostsService
  ],
  // ...
})
```

PostsService (which is an injectable class) will be instanciated by the App module.

:light_bulb: Writing `@Injectable` is not needed for classes without dependencies or already decorated classes, but it really helps readability.

_services/posts.service.ts_
```typescript
@Injectable()
export class PostsService {
  // ...
}
```

The PostsPage component can access this dependency:

_components/posts-page.component.ts_
```typescript
export class PostsPageComponent implements OnInit {
  constructor(private postsService: PostsService) {}
  // ...
}
```

Under the hood `this.postsService = new PostsService()` "happens" in the constructor.

:light_bulb: With a shared service and rxjs subjects it's trivial to setup an eventemitter or pubsub messaging.

