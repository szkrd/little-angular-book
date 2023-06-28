# Lifecycle events

:bulb: The most important ones
are  
**ngOnChanges** :door:, **ngOnInit** :alarm_clock: and **ngOnDestroy** :bomb:!

All events:

- (constructor): instanciation; set initial variables, but possibly **nothing else** here! You have no incoming data / input prop values!
- `ngOnChanges()`: incoming input
- `ngOnInit()`: component init, fetch data here if you must
- `ngDoCheck()`: it runs on every detection, so **avoid it** like the plague, unless you really know what you're doing :no_entry_sign:
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
