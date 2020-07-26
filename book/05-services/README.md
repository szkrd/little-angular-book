# Services

Services are injectable classes that usually are instanciated by the DI system.

See also: [sharing services](../04-dependency-injection/02-sharing-services/README.md).

## Utility functions

I don't see a problem with injecting utility classes into services or components (while just importing them without the DI would make testing much harder).

- utility classes shall be instanciated in `app.module.ts` rendering them into application global singletons.
- they _may_ import their methods from external files (test those files individually!).
- methods _probably_ shouldn't know about each other, they are static in nature.
