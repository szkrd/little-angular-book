{% raw %}
# Value provider

Here's the previous example, but with a value, not a wrapper class.

Since this is not a class, we're not instanciating anything this time.

```typescript
import {MarkedOptions, parse} from 'marked';

type MarkedParser = (src: string, options?: MarkedOptions) => string;

@Directive({
  selector: '[appMarkdown]',
  providers: [
    { provide: 'toMarkdown', useValue: parse } // <-- !!
  ]
})
export class MarkdownDirective implements OnChanges, OnInit {
  toMarkdown: MarkedParser;
  @Input('appMarkdown') text: string;

  constructor(
    private el: ElementRef,
    @Inject('toMarkdown') toMarkdown: MarkedParser // <-- !!
  ) {
    this.toMarkdown = toMarkdown;
  }
  
  // ...
}
```

The "toMarkdown" id is a string (but we could've used anything else with the provide property).

To avoid name collisions one may use a unique value - the recommended wrapper is the `InjectionToken` (its previous version, the OpaqueToken, has been deprecated) class:

```typescript
const injectableId = new InjectionToken<MarkedParser>('toMarkDown');
```

Then use the "symbolish" id in `@Inject(injectableId)`.

:bomb: For some reason Symbol as an id doesn't work with Angular 5, though it clearly should. This may be a [regression](https://github.com/angular/angular/issues/12082).
{% endraw %}
