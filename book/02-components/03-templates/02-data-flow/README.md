# Data flow

## via dynamic attributes (props)

:package: `<img [src]="avatar">`

- usually parent to child
- without the bracket it would be a static string
- force attribute binding (instead of a prop):  
  `<button [attr.aria-label]="ariaLabel">...</button>`

## via events

:banana: `<button (click)="onSave()">Save</button>`

- native events and custom events follow the same format
- usually child to parent
- ~~`<h2 (click)="onClick">`~~ - must be a proper fn **call** :no_entry_sign: (not just the name of the function)
- `<h2 (click)="onClick($event)">` - MouseEvent argument

:bulb: For stop propagation use the `$event`, but for a prevent default returning false is enough:

```html
<a href="#" (click)="onYearToggleClick(item.year); false">...</a>
```

## two-way

:package::banana: (banana in a box) `<input [(ngModel)]="name">`

- `[(size)]` === `[size]` + `(sizeChange)`
- one can manually implement this in a component with _@Input size_ and _@Output sizeChange_ (EventEmitter<number>)
- for the example to work don't forget to add **FormsModule** in your _app.module.ts_
