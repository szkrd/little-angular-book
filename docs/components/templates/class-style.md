{% raw %}
# Class & style helpers

[Attr/prop], (event), [(two-way)], ngClass, ngStyle

## With binding

- `<span [class]="tag.slug">{{tag.name}}</span>` - overwrites the whole class
- `<span [class.popular]="tag.count > 100">{{tag.name}}</span>` - set className
- `<button [style.font-size.em]="isSpecial ? 2 : 1.2">...</button>` - set one style element with unit

## With builtin directives

```javascript
classes = { selected: this.selected, promo: this.promo };
styles = { 'font-size': this.selected ? '1.2em' : '1em' };
```

In the html:
- `[ngClass]="classes"`
- `[ngStyle]="styles"`
{% endraw %}
