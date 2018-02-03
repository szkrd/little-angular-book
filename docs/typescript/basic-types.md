# Basic types

## simple types

```typescript
let isFoo: boolean = true;
let name: string = 'Peter Parker';
let answer: number = 42;
```

## arrays and readonly arrays

```typescript
let lotteryNumbers: number[] = [22, 48, 16, 45, 7];
let dogs: Array<string> = [ 'Fido', 'Butch', 'Killer', 'Snoopy' ];
let cats: ReadonlyArray<string> = [ 'Princess', 'Shadow', 'Tabby', 'Puffy']; // with mutators removed
let whatevs: any[] = [ 'foo', 42, true ];
```

## tuples

Arrays with fixed number of items.

```typescript
let buyThis: [ string, number ] = [ 'eggs', 6 ];
```

## enums

Array of named numbers. It's possible to use strings, instead of numbers though.

```typescript
enum states { SelectAirport, PickDate, SetPassengerCount } // 0, 1, 2
let currentState: states = states.SelectAirport;
```

## void, null, undefined, never

```typescript
let run = (s: string): void => { console.log(s); };
let thinAir: null = null;
let horror: undefined;
let die = (lastWords: string[]) => { throw new Error(lastWords.join(', ')); };
```

## type assertion (type casting)

```typescript
let cat = 'Garfield'; // implicit string, let's say this variable is coming outside of TS

let catNameLen = (cat as string).length; // tsx safe syntax
let catNameLen = <string>cat.length;
```
