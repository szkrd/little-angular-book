# Decorators

- Decorators are functions when placed in a decorator context will be called with special contextual parameters.
- If you want to create decorators that accept parameters during "decoration", use a factory.

## Class decorators

Called with the **constructor** function.

```typescript
function sealed(ctor: Function) {
  Object.seal(ctor);
  Object.seal(ctor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  // ...
}
```

## Method and accessor decorators

Parameters:

1. constructor (static member) or prototype (instance member)
2. name
3. [property descriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

Only one accessor (either the getter or the setter) may be decorated, since the very same decorator would operate on the same member.

```typescript
function friendly (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  let oldFn = descriptor.value;
  descriptor.value = function () { return oldFn.call(this) + ', my friend'; };
}

class GreeterBot {
  greeting: string;
  constructor (message: string) {
    this.greeting = message;
  }

  @friendly
  public greet () {
    return 'Hello, ' + this.greeting;
  }
}

let rosey = new GreeterBot('Judy');
rosey.greet(); // prints "Hello Judy, my friend"
```

## Property and parameter decorators

:rocket: Since es6 class properties are not enumerable, manipulating their descriptors is not exactly trivial.
  The official examples themselves are relying heavily on the `reflect-metadata` package (future metadata API polyfill) for easier reflection.

