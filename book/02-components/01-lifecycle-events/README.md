# Lifecycle events

:light_bulb: The most important ones are:

1. :alarm_clock: **ngOnInit**
2. :door: **ngOnChanges**
3. :coffin: **ngOnDestroy**

All events:

- (constructor): instanciation; set initial variables, but possibly **nothing else** here! You have no incoming data / input prop values!
- `ngOnChanges()`: incoming input; `SimpleChanges` does NOT support generic `<T>` ([feature request since 2017](https://github.com/angular/angular/issues/17560))
- `ngOnInit()`: component init, fetch data here if you must
- `ngDoCheck()`: it runs on every detection, so **avoid it** like the plague, unless you really know what you're doing :no_entry:
- for projected (transcluded) content and children related:	
  - `ngAfterContentInit()`: transcluded content initialized
  - `ngAfterContentChecked()`	
  - `ngAfterViewInit()`: the view (along with children) has fully been initialized	
  - `ngAfterViewChecked()`	
- `ngOnDestroy()`: clean up your subscribers and event listeners here	

```typescript
@Component({ selector: 'app-sample', template: `...` })
class Sample implements OnInit, OnChanges, OnDestroy {
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {}
}
```

## Unsubscribing on destroy

- any observable subscribed to should be unsubscribed from when the component is destroyed
- the only exception (because Angular does this automatically) is the `| async` pipe

### Popular ways of unsubscribing onDestroy

1. some people created a `destroyed = new Subject()` helper (then used `takeUntil` and `this.destroyed.next()`)
2. `@UntilDestroy` is a popular way of doing unsubscribes (using decorators)
   - see https://github.com/ngneat/until-destroy
   - before the component decorator use `@UntilDestroy()`
   - use a pipe before subscription: `.pipe(untilDestroyed(this)).subscribe(...)`
3. since A16 we have a builtin `takeUntilDestroy`
   - this can only be used in injection contexts (constructor or "pre" constructor)
   - use `.pipe(takeUntilDestroyed()).subscribe(...)`
   - it uses `DestroyRef` under the hood, which is needed if you're not inside an injection context:
     - injection: `destroyRef = inject(DestroyRef)`
     - usage: `.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(...)`
