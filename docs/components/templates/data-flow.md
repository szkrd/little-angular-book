{% raw %}
# Data flow

- :package: child to parent / dynamic attributes (props): `<img [src]="avatar">`
  - without the bracket it would be a static string
  - force attribute binding (instead of a prop):  
    `<button [attr.aria-label]="ariaLabel">...</button>`
- :banana: parent to child / events `<button (click)="onSave()">Save</button>`
  - `<h2 (click)="onClick">` - must be a proper fn call :no_good:
  - `<h2 (click)="onClick()">` - no arguments
  - `<h2 (click)="onClick($event)">` - MouseEvent argument
- :package::banana: banana in a box, two-way shorthand
  `<input [(ngModel)]="name">`
  - `[(size)]` === `[size]` & `(sizeChange)`
  - one can manually implement this in a component with _@Input size_ and _@Output sizeChange_ (EventEmitter<number>)
{% endraw %}
