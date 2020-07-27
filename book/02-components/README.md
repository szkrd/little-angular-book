# Components

1. [Lifecycle events](01-lifecycle-events/README.md)
2. [Input and output](02-input-output/README.md)
3. [Templates](03-templates/README.md)
4. [Styles](04-styles/README.md)

Components should have a clear way of communicating with the outside world (their parent).

- smart (container) component: component with data model wired in (through store, service, inline ajax etc.), possibly stateful, usable in certain contexts only
- dumb (presentational) component: communicates through input and output channels, stateless, properly encapsulated, highly reusable
