
# Factory provider

Sometimes the class we want to inject needs to have its own parameters.

For example I have a cache interceptor that can work with multiple backends (like a web storage service):

```typescript
providers: [
  RepoService,
  IssueService,
  {
    provide: HTTP_INTERCEPTORS,
    useFactory: () => {
      const sessionStorage = new SessionStorageService(); // depth -2
      const httpCacheBackend = new StorageCacheService(sessionStorage); // depth -1
      return new HttpGetCacheInterceptor(httpCacheBackend); // depth 0
    },
    multi: true
  }
]
```

(The `multi` property is only useful for interceptors.)

A factory may have its (injectable) dependencies too - while the above is a bit convoluted, here's a simpler example:

```typescript
[
  {
    provide: PollService,
    useFactory: (logger: Logger) => new PollService(logger),
    deps: [Logger]
  }
]
```

