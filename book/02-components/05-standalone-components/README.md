# Standalone components

- Requires version 14 or newer; docs are [here](https://angular.io/guide/standalone-components),
  and there's a good [tutorial](https://netbasal.com/angular-standalone-components-welcome-to-a-world-without-ngmodule-abd3963e89c5)
  for a fully standalone component based app.
- In the `@Component` decorator use `standalone: true`.
- If the project is not a fully standalone component based one, then you can skip the declaration in `@NgModule`,
  but NOT the `imports:` part (in _app.module.ts_).
- Use `imports: []` in the decorator for child component dependencies.

Use ng cli to generate a standalone component: `ng g c components/standalone-button/colored-text --standalone`  
(params for all in one file: `--inline-style` `--inline-template` and `--skip-tests`).

The providers will need to be added to _main.ts_ (routes is the same old route definition we used before):

```typescript
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()],
}).catch((err) => console.error(err));
```
