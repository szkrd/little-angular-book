
# Templates

- `script` tags are not allowed, top level html/body are pointless of course
- expressions only: `{{userName}}`, `{{1 + 1}}`
  - supports null coalescing operator `{{post?.category}}`
  - no chaining, new, assignment, side effects or bitwise ops
- bound properties must be _public_ in the class (see [here](https://github.com/angular/angular-cli/issues/5621#issuecomment-290896552))
- referencing: `<input #username> {{username.value}}`  
  referencing in the class:  
  ```typescript
  @ViewChild('username')
  private readonly usernameInputRef: ElementRef<HTMLInputElement>;
  ```
- data flow and binding:
  - box, banana, banana in a box  
  - `[attr/prop]`, `(event)`, `[(two-way)]`
- class, style, attr:
  - `[class]`, `[class.foo]`,<br>
     `[class]="isOpen ? 'far fa-minus-square' : 'far fa-plus-square'"`,<br>
     `[class]="['pill', 'pill-' + name]"`,<br>
     `[class]="{'hidden': !isVisible, 'expanded': isExpanded}"`
  - `[style]`, `[style.width.%]`, `[style.width.px]`
  - `[attr.colspan]="colCount"`, `[attr.disabled]="!canSubmit"`
  - `[ngClass]`, `[ngStyle]` = classic directive, :older_man: [probably will be](https://github.com/angular/angular/pull/58860)
     [deprecated](https://angular.schule/blog/2024-11-ngclass-ngstyle)
- structural directives: `*ngIf`, `*ngFor`, `*ngSwitch`
