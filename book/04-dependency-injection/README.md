# Dependency injection

1. [Circumventing the DI system](01-circumventing-di/README.md)
2. [Sharing services](02-sharing-services/README.md)
3. [Providers](03-providers/README.md)
4. [DI tricks](04-di-tricks/README.md)

In Angular one passes dependencies to a class **through its constructor**: this clearly defines and tells us what the dependencies of a class are and makes testing really easy.

Since those dependencies may need their own parameters, may have already been instanciated or just need to be mocked, we need a DI system to help us with these tasks.

- dependencies are **unique per injector** (so if you provide a dependency in a _@Component_ and not in the topmost _@NgModule_ then each and every component instance will have its own injected dependency)
- dependencies exist in a tree, just like the components
  - the dependency walker will walk from down to up, from child to parent
  - _@Host_ will not walk further than the current host
  - _@Optional_ set the non-existent dependency to null

:exclamation: Place global dependencies in `@NgModule` - they are going to be instanciated only once.

:bulb: During testing one can easily inject mock dependencies instead of real ones.
