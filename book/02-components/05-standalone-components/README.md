# Standalone components

- If the project is not a fully standalone component based one, then you can skip the declaration in `@NgModule`,
  but NOT the `imports:` part (in _app.module.ts_).
- Use `imports: []` in the decorator for child component dependencies.

Use ng cli to generate a standalone component: `ng g c components/standalone-button/colored-text --standalone`  
(params for all in one file: `--inline-style` `--inline-template` and `--skip-tests`).

TODO

https://angular.io/guide/standalone-components

https://netbasal.com/angular-standalone-components-welcome-to-a-world-without-ngmodule-abd3963e89c5
