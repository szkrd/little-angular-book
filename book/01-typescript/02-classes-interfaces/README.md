# Classes and interfaces

:bulb: TypeScript, unlike Java, understands types as **shapes**.

If a class quacks and walks like a duck and an interface quacks and walks like a duck then they are interchangeable from TypeScript's point of view (at least as a definition).

## Class

```typescript
class Animal {
  name: string; // plain public uninitialized
  private readonly id: number = 0; // readonly, default value

  constructor (name: string) {
    this.name = name;
  }

  // we got public (default), private, protected
  protected rename (newName: string) {
    this.name = newName;
  }
}
```

## Inheritance

```typescript
class Dog extends Animal {
  private _bites: boolean = false; // unfortunately underscore IS needed
  private isAngry: boolean = false;

  static saySomething (): void { // static method
    console.log('something');
  }

  bark (words: string = 'woof woof') {
    console.log(`${this.name} barks "${words}"`);
  }

  get bites (): boolean {
    return this._bites;
  }

  // without this setter _bites would be a readonly
  set bites (b: boolean) {
    this._bites = b;
    if (b) {
      this.isAngry = true;
    }
  }
}
```

```typescript
let fido = new Dog('Fido');
```

## Abstract class

Abstracts can not be instanciated! They serve as a base template for other classes.

```typescript
abstract class AlphaMale {
  abstract bite (): void;
}
```

## Mixins

Mixins can be emulated through `C implements A, B` (where A and B are classes), but the effective mixin logic must be implemented manually!

This means that one must copy (mix) the prototype methods from A and B to C using an `applyMixins` implementation.

## Interfaces

Interfaces are just interface definitions and as such they will be removed during the TS compilation process.

One can use interfaces to describe the shape of

- objects (their properties and their value types)
- functions (input parameters, parameter order, output values)
- iterables
- classes

### Object interface

```typescript
interface Book {
  readonly title: string;
  readonly subtitle?: string; // <-- notice the question mark, this is an optional prop
  readonly author: string;
  read?: boolean;
  score?: number;
}

let oldBook: Book = { title: 'Candide', subtitle: 'All for the best', author: 'Voltaire' };
let newBook: Book = { title: 'Men Without Women', author: 'Murakami Haruki' };
oldBook.read = true;
newBook.read = false;
```

```typescript
interface FuzzyDog {
  name: string;
  owner?: string;
  [propName: string]: any; // <-- this can be anything (both the key and the value!)
}

let janesDog: FuzzyDog = { name: 'Fido', owner: 'Jane', favoriteFood: 'tripe ration' };
let strayDog: FuzzyDog = { name: 'Socks', age: null, marked: true };
```

### Function interface

```typescript
interface FindFn {
  (needle: string, haystack: string[]): boolean;
}

let searchForOwner: FindFn = (s, names) => names.includes(s.toLowerCase());
```

### Index interface

```typescript
interface VeryComplicatedReadonlyArray {
  readonly [index: number]: string;
}
let boyNames: VeryComplicatedReadonlyArray = [ 'Joe', 'Jack', 'John' ];
let girlNames: ReadonlyArray<string> = [ 'Jane', 'Jill', 'Judy' ];
```

### Class interface

```typescript
interface Dog {
  type: string;
  bark (count: number): void;
}

class GuardDog implements Dog {
  type: 'german shepherd';
  bark (count: number) {
    for (let i = 0; i < count; i++) {
      console.log('Woof!');
    }
  }
}
```

### Extending interface

Multiple interfaces may be extended at once.

```typescript
interface Shape {
  color: string;
}

interface Circle {
  radius: number;
}

interface Disc extends Shape, Circle {
  fillColor: string;
}
```

### Auto-merging interfaces

TS can merge interfaces with the same name (unlike Classes):

```typescript
interface Box {
    height: number;
    width: number;
}

interface Box {
    scale: number;
}

const box: Box = {height: 1, width: 1, scale: 3}
```

