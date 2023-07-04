# Components

1. [Lifecycle events](01-lifecycle-events/README.md)
2. [Input and output](02-input-output/README.md)
3. [Templates](03-templates/README.md)
4. [Styles](04-styles/README.md)
5. [Standalone components](05-standalone-components/README.md)

Components should have a clear way of communicating with the outside world (their parent or their children).

- smart (container) component: component with data model wired in (through store, service, inline ajax etc.), possibly stateful, usable in certain contexts only
- dumb (presentational) component: communicates through input and output channels, stateless, properly encapsulated, highly reusable

To **g**enerate a **c**omponent (with ng cli): `cd src/app/ && ng g c components/MyButton`  
(it will create the my-button files in a my-button directory).
