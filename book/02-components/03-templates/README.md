# Templates

1. [Raw HTML](./01-raw-html/README.md)
2. [Data flow](./02-data-flow/README.md)
3. [Class and style](./03-class-style/README.md)
4. [Structural directives](./04-structural-directives/README.md)
5. [Content projectsion (slots)](./05-content-projection/README.md)
6. [Pipes](./06-pipes/README.md)

---

- `script` tags are not allowed, top level html/body are pointless of course
- expressions only: `{{userName}}`, `{{1 + 1}}`
  - supports null coalescing operator `{{post?.category}}`
  - no chaining, new, assignment, side effects or bitwise ops
- bound properties must be _public_ in the class (see [here](https://github.com/angular/angular-cli/issues/5621#issuecomment-290896552))
- referencing: `<input #username> {{username.value}}`
- data flow and binding:
  - box :package:, banana :banana:, banana in a box :bento_box:
  - `[attr/prop]`, `(event)`, `[(two-way)]`
- class and style:
  - `[class]`, `[class.foo]`, `[style]`, `[style.width.%]`
  - `[ngClass]`, `[ngStyle]`
- structural directives: `*ngIf`, `*ngFor`, `*ngSwitch`
