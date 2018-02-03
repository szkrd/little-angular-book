# Advanced types

- intersection (&) and union (|)
- runtime type guards (is)
- TS understands typeof in code (for string, number, boolean, symbol)
- TS understands instanceof in code
- nullables (null and undefined assignable to anything; vs: strictNullChecks)
- type aliases (vs interfaces)
- this may be used as a return type (useful for chaining)
- index type query operator (T, keyof T)- for partial, pluck etc.

## Custom types (type aliases)

- unlike interfaces type aliases are just aliases, they have no "real names" (for example in error messages)
- they can't be implemented or extended (if possible, try to use interfaces)

```typescript
type Name = string;
type Box<T> = { value: T };
type LinkedList<T> = T & { next: LinkedList<T> };
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
type Truthy = 'enabled' | 'yes' | 'ok' | 'on' | 'true';
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

let rolled: DiceRoll = 9; // TS will mark this as an invalid assignment
```

## Intersection (&) and union (|)

- `T & U` = contains props from both T and U (useful for extends and mixins)
- `id: string | number` = "either or" (useful for function signatures)

```typescript
function extend<T, U> (a: T, b: U): T & U { return Object.assign({}, a, b); }
let foo = { foo: 1, qux: 2 };
let bar = { bar: 1 };
let baz = extend(foo, bar);
```

This is a bit like overloading, but with the returning type we have less granularity.

```typescript
let multiply = (source: string | number, times: number = 1): any => {
  if (typeof source === 'number') {
    return source * times;
  }
  return (new Array(times)).fill(source).join('');
};

let x: string = multiply('ho', 3);
let y: number = multiply(5, 5);

assert.equal(x + y, 'hohoho25');
```

## Nullables with strictNullChecks

- `strictNullChecks` enabled will disallow assigning null and undefined, unless explicitly allowed
- One can disable null guard with the ! postfix (only with strictNullChecks enabled)

```typescript
let foo = 'bar';
let name: string | null;

foo = null; // not allowed with strictNullChecks
name = null; // we did let null to be assigned

interface X {
  a: number;
  b?: number; // same as `number | undefined`
}
```

## Type guards

:rocket: Writing better typechecks with the "is" keyword:

```typescript
interface Fish { swim: boolean; name: string; }
interface Bird { fly: boolean; name: string; }

let myBird: Bird = { name: 'Tweetie', fly: true };
let myFish: Fish = { name: 'Wanda', swim: true };
let pets = [ myBird, myFish ];

//                                  item is Type
//                                       ↓
function isFish (pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```
