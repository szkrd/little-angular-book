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
