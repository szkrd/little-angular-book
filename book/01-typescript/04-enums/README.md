# Enums

Enums are named constants and can really help with code readability.

They are by default 0 based numbers, but it's possible to define the number itself:

```typescript
enum Control { Up, Down, Left, Right, Space } // 0 based
enum Letter { A = 97, B, C, D } // starts with 97, B will be 98
```

Or the value (using strings):

```typescript
enum Direction {
  Up = 'VK_ARROW_UP',
  Down = 'VK_ARROW_DOWN',
  Left = 'VK_ARROW_LEFT',
  Right = 'VK_ARROW_RIGHT'
}
```

## Advanced uses

:rocket: Typescript enums can have dynamically initialized values:

```typescript
enum Week {
  NumberOfDays = 7,
  Today = (new Date()).getDay() // today is saturday, so it would be 6
}
```

:rocket: Number based enums have reversed mapping too:

- `Week.NumberOfDays` is 7
- `Week[7]` is "NumberOfDays"

:rocket: Const enums are replaced inline by the compiler:

```typescript
//                    0       1       2
const enum States { Select, Search, Result }

let getState = () => States.Search; // will be replaced with the raw value
assert.equal(getState.toString(), '() => 1'); // the stringified compiled javascript code
```

