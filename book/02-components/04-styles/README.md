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


## Global styles

Shadow roots can't get global styles due to their encapsulated nature (`/deep/`, `::ng-deep`, `>>>` has been deprecated).

Some tips:

- you can use a common scss if you keep it to the bare minimum
- `@import "~common.scss";` may be used with absolute paths
- use `stylePreprocessorOptions.includePaths` in `.angular-cli.json` and then you can omit the tilde and the extension, more [here](https://github.com/angular/angular-cli/wiki/stories-global-styles)

:bomb: Such an import will duplicate the css everywhere it has been included (checked the prod build).

:bomb: Css will have mixin support with the [@apply](https://tabatkins.github.io/specs/css-apply-rule/) rule, but right now it's not yet supported anywhere.
