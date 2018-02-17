{% raw %}
# Templates

- `script` tags are not allowed, top level html/body are pointless of course
- expressions only: `{{userName}}`, `{{1 + 1}}`
  - supports null coalescing operator `{{post?.category}}`
  - no chaining, new, assignment, side effects or bitwise ops
- bound properties must be _public_ in the class (see [here](https://github.com/angular/angular-cli/issues/5621#issuecomment-290896552))
- referencing: `<input #username> {{username.value}}`
- data flow and binding:
  - box, banana, banana in a box  
  - `[attr/prop]`, `(event)`, `[(two-way)]`
- class and style:
  - `[class]`, `[class.foo]`, `[style]`, `[style.width.%]`
  - `[ngClass]`, `[ngStyle]`
- structural directives: `*ngIf`, `*ngFor`, `*ngSwitch`
{% endraw %}
