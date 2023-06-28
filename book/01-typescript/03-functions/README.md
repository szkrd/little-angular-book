# Functions

The simplest example: `let inc = (x: number, y: number = 1): number => x + y;`

It's fairly simple to define array parameters:

```typescript
let baptize = (familyName: string, ...names: string[]): string => [familyName, ...names].join(' ');
//            ↑                                           ↑        ↑
//           input                                     output     implementation
```

## Alternate signatures (overloading)

Treat this as a **lightweight** overloading: you can't define multiple functions with the same name, but you can define multiple interfaces for one function.

Then of course it's up to you to see if the input quacks or barks. In a "real" typed language this would not be needed, but typescript is just sugar on top of javascript (albeit sweet and helpful sugar).

```typescript
// overload signatures
function getHeight(element: HTMLElement): number; // signature A
function getHeight(element: string): number; // signature B

// implementation signature
function getHeight(element: any): number {
  // this is not part of the "valid" overload list
  let node: HTMLElement | null;
  if (typeof element === 'string') {
    // we still have to poke the duck
    node = document.querySelector(element);
  } else {
    node = element;
  }
  return node ? node.getBoundingClientRect().height : -1;
}
```

to use the above function:

- `getHeight('body');` → calls signature A
- `getHeight(document.getElementsByTagName('body')[0]);` → calls signature B
- `getHeight(42);` → this will **not** work on typescript's level :no_entry_sign: (but will work of course in the compiled js)

:bulb: For relatively simple functions it's easier to define multiple parameter types: `getHeight (element: string | HTMLElement)`.

:exclamation: Notice how the function "technically" accepts any type - both signatures are just type helpers and will be stripped away.

## Defining context (explicit this)

One may enforce an expected calling context for a function:

```typescript
interface User {
  age: number;
  department: string;
}

interface Users {
  [name: string]: User;
}

let users: Users = {
  john: { age: 30, department: 'management' },
  jack: { age: 26, department: 'backend development' },
  jill: { age: 34, department: 'human resources' },
};

function getUser(this: Users, name: string = 'jill') {
  return this[name];
}
```

- use call or apply: `getUser.call(users, 'jack');`
- it would **not** work without the scoping: `getUser('jill');` :no_entry_sign:
