{% raw %}
# Templates

- `script` tags are not allowed, top level html/body are kinda pointless of course
- expressions only: `{{userName}}`, `{{1 + 1}}`
  - supports null coalescing: `{{post?.category}}`
  - no chaining, new, assignment, side effects or bitwise ops
- bound properties must be "public"
- referencing: `<input #username> {{username.value}}`
- data flow and binding: box, banana, banana in a box
- class and style: [Attr/prop], (event), [(two-way)], ngClass, ngStyle
- structural directives: *ngIf, *ngFor, *ngSwitch
{% endraw %}
