# Structural directives

Only one may be present on an element.

- **if**: `*ngIf`
- **for**: `*ngFor`
  - the minimum: `let tag of tags`
  - extras: `let tag of tags; index as i; trackBy: tag.slug;`
    (index, first, last, even, odd)
  - with observable and async pipe:
    `let user of usersObservable | async as users`
- **switch**: `[ngSwitch]` + `*ngSwitchCase` + `*ngSwitchDefault`
