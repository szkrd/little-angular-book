# Generics

- typically describes types of items inside a collection
- something can _work on_ various types
- use angle brackets: `<T>`

```typescript
function identity<T> (foo: T): T {
  return foo;
}

let s = identity<string>('foo');
```

Working on a collection:

```typescript
function uniq<T> (items: T[]): T[] {
  return [...new Set(items)];
}
```

## Advanced uses

:rocket: Object and property constraints (`key of`):

```typescript
//                    "key" must extend a key of "obj" 
//                      ↓
function getProperty<T, K extends keyof T> (obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, 'a'); // for statically created objects only of course
getProperty(x, 'e'); // will trigger a warning
```

:rocket: Class types for factories:

```typescript
//              Type of Klass
//              ↓
function create<T> (Klass: {new(): T;}, name: string): T {
  return new Klass();
}

create(Dog, 'Fido');
create(Cat, 'Tabby');
```

For a factory method one can define the allowed class types:

```typescript
function createVehicle<T extends Vehicle> (Klass: {new(): T;}, passengerCount: number): T {
  return new Klass();
}

const car = createVehicle(Car, 5);
const airplane = createVehicle(Airplane, 396);
```
