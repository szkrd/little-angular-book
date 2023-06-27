# Styles

- Styles are scoped (by default in an emulated fashion, but one can enable real shadow DOM styles with `encapsulation: ViewEncapsulation.Native`)
- Emulated scope example: `<div class="content"></div>` + `.content { color: red; }` = `.content[_ngcontent-ng-c1906523200] { ... }`
- If you are using an **element** selector in `@Component` then your element will be in the DOM! Use the `:host` selector to style it.
  For example `app-button` will create an `<app-button />` custom HTML element.
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

## Global style

Trying to style the `body` element from a component will not work, because the element is outside the component.

Angular already allows the use of a global style file in _angular.cli_ with `"styles": [ "src/styles.scss" ]`,  
you can add global styles (or do global imports) here.

## Sharing style among encapsulated components

- Shadow root for a component is enabled with `encapsulation: ViewEncapsulation.ShadowDom`
- Shadow roots proper can't get shared styles due to their encapsulated nature  
  (`/deep/`, `::ng-deep`, `>>>` has been marked as deprecated and may go away sometime).

### Css

You can use a common **css** if you keep it to the bare minimum:  
`@import "/src/styles/common.css";` or `@import "../../../styles/common.css";`

:exclamation: Such an import will duplicate the css everywhere it has been included (checked the prod build).

:bulb: Plain css was planned to have mixin support with the [@apply](https://tabatkins.github.io/specs/css-apply-rule/) rule, but that effort has been abandoned.

### Scss

For **scss** you can use mixins (and serve the transpiled css gzipped on your server):  
`@import "/src/styles/mixins";` or `@import "../../../styles/mixins";`

Then use the mixin in the encapsulated component's scss:

```scss
:host {
  @include button-shadow();
}
```

Be sure to name the file as a proper [partial](https://stackoverflow.com/a/34890015)
with an underscore (**\_mixins.scss**), so that it will not be included multiple times.

:bulb: You can shorten the import to the filename (like `@import "mixins";`) if you add
the directory as an include path in _angular.json_:  
`"stylePreprocessorOptions": { "includePaths": ["src/styles"] },`

:bomb: Unfortunately you can't add the partial's import to common _src/styles.scss_ and expect it to work elsewhere
(the recompiler sometimes forgets to break, nevertheless it's not working).
