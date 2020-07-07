# Components

Components should have a clear way of communicating with the outside world (their parent).

- smart (container) component: component with data model wired in (through store, service, inline ajax etc.), possibly stateful, usable in certain contexts only
- dumb (presentational) component: communicates through input and output channels, stateless, properly encapsulated, highly reusable
