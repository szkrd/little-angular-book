
# Class provider

The simplest provider is the class provider:

```typescript
@NgModule({
  // ...
  providers: [
    PostsService // === { provide: PostsService, useClass: PostsService }
  ],
  // ...
})
```

As indicated in the comment, this is a shortcut for
`[{ provide: PostsService, useClass: PostsService }]`.

Use `useClass` to replace the dependency with any other class (for example during testing).

:bulb: You can use the same (already instanciated) class multiple times as an alias with `useExisting:` - this way you will not instanciate the same class multiple times.

:no_entry_sign: `[Foo, {provide: Bar, useClass: Foo}]` would instanciate Foo twice!

## Blog example

I'm using [marked](https://github.com/chjj/marked) to parse text into markdown, so I can either create a wrapper class around the external library, or provide it as a value.

Wrapping it in a class (interfaces are just typescript sugar, so defining a class is more straightforward):

```typescript
import {MarkedOptions, parse} from 'marked';

export class Marked {
  parse: (src: string, options?: MarkedOptions) => string = parse;
}
```

Now we can expose the wrapper in the app.module's @NgModule via `providers: [ Marked, ... ]`.

We can now use it in the directive:

```typescript
export class MarkdownDirective implements OnChanges, OnInit {
  constructor(private el: ElementRef, private marked: Marked) {}
  // ...
}
```

