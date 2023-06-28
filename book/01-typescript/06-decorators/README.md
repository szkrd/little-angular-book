# Decorators

- Decorators are functions when placed in a decorator context will be called with special contextual parameters.
- If you want to create decorators that accept parameters during "decoration", use a factory.
- Ecmascript **stage 3** decorators are supported since TS 5.0 (this is a breaking change over the old decorator handling).
- The **old** (stage 2) decorator handling is (still) available with `experimentalDecorators`.

:rocket: With the new decorator handling most of this section has been removed and I consider it to be an "advanced" topic;
feel free to check the [TS5 decorator announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators) for details (or TS docs, should Microsoft update it; as of this writing it still reflects the stage 2 description).

## A method decorator

We want to add a logger to method calls using decorators.

```typescript
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  @logMethod
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

const ron = new Person('Ron');
ron.greet();
```

The decorator (simplified somewhat, addig proper type annotations is not trivial):

```typescript
function loggedMethod(originalMethod: any, _context: any) {
  function replacementMethod(this: any, ...args: any[]) {
    console.log('LOG: Entering method.');
    const result = originalMethod.call(this, ...args);
    console.log('LOG: Exiting method.');
    return result;
  }

  return replacementMethod;
}
```

An example `bound` decorator (for auto binding methods):

```typescript
function bound(originalMethod: any, context: ClassMethodDecoratorContext) {
  const methodName = context.name;
  if (context.private) throw new Error(`Cannot decorate private properties (${methodName as string}).`);
  context.addInitializer(function () {
    (this as any)[methodName] = (this as any)[methodName].bind(this);
  });
}
```
