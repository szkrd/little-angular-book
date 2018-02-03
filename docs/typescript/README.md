# TypeScript

Angular uses TypeScript. While you can omit all type definitions, trying to ignore TS (not including it in an angular project) and going all js would not be a good idea.

:bulb: Angular devs wanted to create another language on top of javascript, because they needed to rely heavily on code annotations (decorators, hence the @ naming) which are not yet part of the js spec. Fortunately TS decided to add decorator support and Angular went with TypeScript.

## What is TypeScript

TypeScript (TS) is a strict **syntactical superset** of JavaScript, and adds **optional static typing** to the language.

Syntactical superset means that the TS compiler will **not** transpile your code to ES5 or add polyfills for ES6/7 so if you are using object spread for example (`{...}`) and the target browser does not support object spread then you **must** transpile your code (probably with Babel or Bublé).

TS feels like a bridge between java and javascript and it is rather close to the failed and forgotten **ES4** (or ActionScript / **AS3**) - the type system is optional and noone stops you from using functional concepts if you prefer those (though some people would argue that the class system and the philosophy around types is a deviation from the functional nature of the language).

:bulb: Anders Hejlsberg, grand daddy of Turbo Pascal, Delphi and C#, is the lead architect of TypeScript.

## Keeping your code clean: linting

- Coding style should be enforced by a linter. Use **tslint** for TS.
- eslint _may_ work to a certain extent with babel parser or typescript eslint parser. :question:
- `tslint:recommended` seems to be a sane default, but it feels different from the standard/semistandard world.
- `"extends": "tslint-config-semistandard"` works, but feels out of place and triggers warnings during script execution (unrelated to the code itself).

## Shims, transpilers, ES5-6-7

Don't forget to use target `es6` in tsconfig (es5 target will break with es6 language features, like `Set` for example) -
`@types/es6-shim` and `es6-shim` will [not help](https://github.com/Microsoft/TypeScript/issues/6842).

If you want `array.includes` for example, then add the es7 option to tsconfig (`lib: ['es7']`)

:bulb: ES7 has `array.includes` and the exponentiation operator (`**`, Math.pow).

## External dependencies, type definitions

If you are using 3rd party libraries then you will have to interface with them somehow (or at least let the TS compiler know about those interfaces). Use [Definitely Typed](http://definitelytyped.org/) to find and then install (`npm install --save @types/foo`) type definitions.

For example the `TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.` error means just that (and may be solved with `npm i -S @types/react @types/react-dom`). This may sound optional, but for tsc this is **not**.

## Automatically detected types

TS can implicitly assign types to a variable (for example in `const foo = 'bar'` foo will be a string type).

If you are not going to initialize your variable then the compiler will assume an `any` type. This may lead to bugs but in the early days it may be helpful, especially if you're new to typescript. This behaviour may be disabled with `noImplicitAny: true` in tsconfig.

TS does some clever things in the background to infer types for you, so while `const foo = 'bar'` is trivial, it knows that if you use something with `window.onmousedown` for example, then that should be a function with a MouseEvent input parameter (this is called contextual typing).

## Safeguards against nulls

Null and undefined "values" are considered dangerous and are prone to introducing bugs.

With `let name = 'John'` we know that "name" is a string and has the intrinsic properties of strings (has a length, has a toUpperCase method, can be concatenated with the + operator etc.) - but `name = null` destroys the intrinsic nature of this variable, so extra safeguards are needed in the software.

TypeScript allows `strictNullChecks` to be enabled: with that parameter one must explicitly mark nullable types and the default behaviour is to forbid null/undefined "types".

## Things ignored in this chapter

I tried to find a middle ground with examples and relevancy, for an in depth guide please follow the [TS Handbook](https://www.typescriptlang.org/docs/home.html).

1. Symbols: ts has es6 Symbol support, refer to the ecmascript spec
   or [this nice article](https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols/).
2. Iterators and generators: ts has es6 iterable support, see spec
   or [this mdn example](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator).
3. Modules: es6 import export (which you probably already know about), tsc packaging, advanced topics like
   CommonJS, SystemJS, AMD, UMD/isomorphic, es6 native modules.
4. Namespaces (used to be "internal modules"): it feels like a legacy concept.
   Just use es6 modules and try to skip the multi-file namespace with its triple-slash metadata.
5. Module resolution: with the "node" resolution strategy things are somewhat clearer,
   plus the whole module/path resolving in the shadow of webpack is another advanced thing.
