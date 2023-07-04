# Content projection (slots)

Simple single slot: `<ng-content></ng-content>`

The `ng-content` "element" is a pseudo element, it has no dom wrapper, it can not be styled, like a custom element.

## Fallback

:rocket: Fallback is [NOT](https://github.com/angular/angular/issues/12530) as simple as putting anything into the _ng-content_ element!;
one can use dom empty detection (or do the same with CSS `:empty` of course):

1. Reference the slot's parent with `#name`,
2. then inject value into that element if it's empty.

```html
<span #slot><ng-content></ng-content></span>
```

```html
<ng-container *ngIf="!slot.hasChildNodes()">default text</ng-container>
```

## Named slots

The `ng-container` element can use a CSS selector to reference its source:

```html
<button>
  <app-colored-text>
    <span tooltip>Great discount! One time offer!</span>
    <span text>Buy now</span>
  </app-colored-text>
</button>
```

The `tooltip` and the `text` are plain html attributes, the child can reference them using css selectors:

```html
<span class="tooltip"><ng-content select="[tooltip]"></ng-content></span>
<span class="text"><ng-content select="[text]"></ng-content></span>
```

:bulb: Playing with CSS empty can still be helpful (ie. `.tooltip:not(:empty) { display: none; ... }`  
and then show it on hover with `:host:hover .tooltip { display: block; }`).
