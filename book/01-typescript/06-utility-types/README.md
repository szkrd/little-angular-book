# Utility types

## Basic utility types

I usually use the `Partial`, `Record`, `Pick`, `Omit`, `Readonly` types, the rest not so often.

`Partial` sets all interface properties optional:

```typescript
interface IUser {
  name: string;
  age: number;
  id: number;
}
const jane: IUser = { name: 'Jane Doe', age: 37, id: 13459 };

type IFuzzyUser = Partial<IUser>;
const john: IFuzzyUser = { name: 'John Doe' }; // all keys are optional
```

`Record` is a useful shorthand for dealing with fuzzy key-value objects:

```typescript
const users: Record<string, number> = { john: 20, peter: 35, jill: 31 };
users.jane = 27;
```

`Pick` can set some keys required, while `Omit` can remove keys:

```typescript
interface ITodoItem {
  title: string;
  description: string;
  completed: boolean;
}

type ITodoItemPreview = Pick<ITodoItem, 'title'>;
const todo: ITodoItemPreview = { title: 'Buy catfood' };
```

The above with omit: `type ITodoItemPreview = Omit<ITodoItem, 'description', 'completed'>;`

An example for `Omit` from Fluent UI:

```typescript
type SelectedFormFieldCustomProps = Omit<
  FormFieldBaseProps,
  'control' | 'styles' | 'accessibility' | 'design' | 'variables'
>;
```

`Readonly` will make typescript check if we're trying to overwrite a value:

```typescript
interface ITodo {
  title: string;
}

type IReadonlyTodo = Readonly<ITodo>;
```

## Other utility types

- `Required`: makes all keys required
- `Exclude`: removes items from a set (`type TPets = Exclude<"dog" | "cat" | "lion", "lion">;`)
- `Extract`: opposite of exclude (`type TWildAnimals = Extract<"dog" | "cat" | "lion" | "bear", "lion" | "bear">`)
- `NonNullable`: excludes null and undefined from a type
- `Awaited`: for async await promise unwrapping (`type A = Awaited<Promise<string>>;`)

Types dealing with function/class parameters and the `this` context:

- `Parameters`: creates an array (tuple) from a function definition's arguments
- `ConstructorParameters`: parameters for object constructors (`ConstructorParameters<ErrorConstructor>` is `[message?: string]`)
- `ReturnType`: return type of function type
- `InstanceType`: constructs a type consisting of the instance type
- `ThisParameterType`: extracts the type of the this parameter for a function type
- `OmitThisParameter`: removes the this parameter from type
- `ThisType`: serves as a marker for a contextual this type
