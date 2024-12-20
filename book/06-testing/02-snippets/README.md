# Snippets

## let

- Event: `let eventMock: jasmine.SpyObj<Event>`
- Router: `let routerMock: jasmine.SpyObj<Router>`
- FooService: `let fooServiceMock: jasmine.SpyObj<FooService>`
- LoggerService: `let loggerServiceMock: jasmine.SpyObj<LoggerService>`

## rx

- Obsevable: `foobarMock.corgeMethod.and.returnValue(of())`
- Error: `foobarMock.corgeMethod.and.returnValue(throwError(() => error))`

## mock store

- Store: `let mockStore$: MockStore<PartialDeep<IAppState>>`
- Store provide: `provideMockStore<PartialDeep<IAppState>>({ initialState: { ... } }),`
- Store assignment: `mockStore$ = TestBed.inject(Store) as MockStore<PartialDeep<IAppState>>`
- Refresh state: `mockStore$.refreshState()`
- Override selector: `mockStore$.overrideSelector(selectFoobar, value)`
- Spy on dispatch: `spyOn(mockStore$, 'dispatch')` and then check with `expect(mockStore$.dispatch).toHaveBeenCalledWith(dispatchedAction)`

## fixture

- Get child: `fixture.debugElement.query(By.directive(FoobarMockComponent)).componentInstance`
- Get children: `fixture.debugElement.queryAll(By.directive(FoobarMockComponent)).map(debugEl => debugEl.componentInstance)`
- Force detect changes: `fixture.detectChanges()` (sometimes you may need to "wait" a bit: `await fixture.whenStable()`)
- Initial component creation: `fixture = TestBed.createComponent(FoobarComponent)` and then `component = fixture.componentInstance`
- Set input prop (standalone component): `fixture.componentRef.setInput('inputName', value)`

## spies

- Create spy object: `jasmine.createSpyObj('fooService', ['method'])`
- Router: `routerMock = jasmine.createSpyObj<Router>('Router', ['navigate'])`
- Event: `eventMock = jasmine.createSpyObj<MouseEvent>('clickEvent', ['stopPropagation'])`
- Logger: `loggerServiceMock = jasmine.createSpyObj<LoggerService>('LoggerService', ['warn', 'info'])`
- Spy on an emit: `spyOn(component.fooEvent, 'emit')`

## jest fake time

- Use fake timer: `jest.useFakeTimers()` and then `.setSystemTime(new Date('2020-01-01'))`
- Stop using fake timers: `jest.useRealTimers()`
- Run all timers: `jest.runAllTimers()`
