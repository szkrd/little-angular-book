# DI tricks

## Reach a parent from a child

- a child can detect the presence of a parent (or any ancestor) with `@Optional`
- ancestor components are accessible just like any dependency
- probably cleaner to detect the _presence_ of an ancestor than touching the dom
- do NOT manipulate the ancestor from the child!

```typescript
export class DogComponent {
  constructor(@Optional() public alex: CanineComponent) {}
}
```

