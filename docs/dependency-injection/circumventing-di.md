# Circumventing the DI system

:bomb: Short version: **DON'T**.

People coming from nodejs might want to use a simpler dependency system. The most popular approaches:

- require a dependency, but in the tests, override require itself with [proxyquire](https://github.com/thlorenz/proxyquire)
- wrap a dependency into an object (probably in an `index.js`) and use the object. In the test the object becomes a reference, so one may freely stub or mock its properties.
- use _default imports_ (which are objects under the hood in webpack). Technically an imported dependency should be an immutable object, but webpack can't emulate this behaviour. This would probably break in a real ES6 import capable environment.

These approaches work in a nodejs environment, but not in [Karma](https://karma-runner.github.io/) which runs tests inside the browser (not to mention the need for transpiling, at the minimum from ts to js).

Angular's DI is platform agnostic and allows tests to be run the same way both in the browser or on the server in a virtual jsdom environment.
