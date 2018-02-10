# Styles

- Styles are scoped (by default in an emulated fashion, but one can enable real shadow DOM styles with `encapsulation: ViewEncapsulation.Native`)
- If you are using an **element** selector in `@Component` then your element will be in the DOM! Use the `:host` selector to style it.
  - `:host`: the current root element
  - `:host(.active)`: the current root element with a class
  - `:host-context(.theme-monokai)`: has a parent up the chain with the given class
  - you can circumvent this behaviour (think of svg) with class or attribute selectors!
- Applying styles (in `@Component`)
  - `styleUrls: []`
  - `styles: []`
  - inside the `template` prop with `<style></style>`

```scss
:host {
  display: block;
  flex: 0 0 200px;
}

:host-context(.theme-monokai) {
  background-color: #333;
}

h2 {
  font-size: 16px;
}

```

:bomb: `ViewEncapsulation.None` will destroy a component's boundaries (and will force Angular to duplicate their style in every shadowed element).
