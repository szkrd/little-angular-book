# Jasmine :white_flower:

A10 comes with [v3.5](https://jasmine.github.io/api/3.5/global);
Jasmine is a fairly straightforward bdd framework, has a sane list of
matchers and fairly basic spy capabilities:

- `describe` (desc, specDefs)
- `afterEach`, `afterAll` (fn _opt_, timeout _opt_)
- `beforeEach`, `beforeAll` (fn _opt_, timeout _opt_)
- `it` (desc, fn _opt_, timeout _opt_)
- `expect` (actual), `expectAsync` (actual)
- **focusing**: `fdescribe`, `fit`
- **skipping**: `xdescribe`, `xit`

## Expectation matchers

Negation modifier is `.not.`

- equality
  - **toBe**: `expect(thing).toBe(realThing);`
  - **toEqual**: deep equality `expect(bigObject).toEqual({"foo": ['bar', 'baz']});`
- existence
  - **toBeDefined**: `expect(result).toBeDefined();`
  - **toBeUndefined**: `expect(result).toBeUndefined():`
  - **toBeTruthy**: `expect(result).toBeTruthy();`
  - **toBeFalsy**: `expect(result).toBeFalsy();`
- boolean
  - **toBeTrue**: `expect(result).toBeTrue();`
  - **toBeFalse**: `expect(result).toBeFalse();`
- numbers
  - **toBeNaN**: `expect(thing).toBeNaN();`
  - **toBeCloseTo**: `expect(number).toBeCloseTo(42.2, 3);`
  - **toBeGreaterThan**: `expect(number).toBeGreaterThan(3);`
  - **toBeGreaterThanOrEqual**: `expect(number).toBeGreaterThanOrEqual(25);`
  - **toBeLessThan**: `expect(number).toBeLessThan(0);`
  - **toBeLessThanOrEqual**: `expect(number).toBeLessThanOrEqual(123);`
  - **toBeNegativeInfinity**: `expect(number).toBeNegativeInfinity();`
  - **toBePositiveInfinity**: `expect(number).toBePositiveInfinity();`
- string
  - **toContain**: `expect(string).toContain(substring);`
  - **toMatch**: `expect("my string").toMatch(/string$/);`
- array
  - **toContain**: `expect(array).toContain(anElement);`
- class/null
  - **toBeNull**: `expect(result).toBeNull();`
  - **toBeInstanceOf**: `expect(result).toBeInstanceOf(String);`
- html
  - **toHaveClass**: `expect(htmlEl).toHaveClass('bar'); //css`
- throw
  - **toThrow**: `expect(() => { return 'x'; }).toThrow();`
  - **toThrowError**: `expect(() => { return 'x'; }).toThrowError();`
  - **toThrowMatching** `expect(() => { return 'x'; }).toThrowMatching(predicateFn)`
- async/promise (expectAsync)
  - **toBeResolved**: `expectAsync(aPromise).toBeResolved();`
  - **toBeResolvedTo**: `expectAsync(aPromise).toBeResolvedTo({prop: 'value'});`
  - **toBeRejected**: `expectAsync(aPromise).toBeRejected();`
  - **toBeRejectedWith**: `expectAsync(aPromise).toBeRejectedWith({prop: 'value'});`
  - **toBeRejectedWithError**: `expectAsync(aPromise).toBeRejectedWithError(MyError, /message/);`

Future 3.6:

- toHaveSize (instead of array.length)
- toHaveBeenCalledOnceWith (spy)
- toBePending (async)

## Spies

Spy naming (`aName`) is optional, like most other parameters (lots of :duck: typing).

- spying on existing objects
  1. **spyOn**: spy on a method - `spyOn(obj, methodName)`
  2. **spyOnProperty**: spy on a prop (with defineProperty) - `spyOnProperty(obj, propName, 'get'/'set')` 
  3. **spyOnAllFunctions**: `spyOnAllFunctions(obj)`
- spy creation
  1. **createSpy**: `jasmine.createSpy(aName, fn)`
  2. **createSpyObj**: `jasmine.createSpyObj(aName, [ methods ], [ props ])`
- spy matchers
  - **toHaveBeenCalled**: `expect(mySpy).toHaveBeenCalled();`
  - **toHaveBeenCalledBefore**: `expect(mySpy).toHaveBeenCalledBefore(otherSpy);`
  - **toHaveBeenCalledTimes**: `expect(mySpy).toHaveBeenCalledTimes(3);`
  - **toHaveBeenCalledWith**: `expect(mySpy).toHaveBeenCalledWith('foo', 'bar', 2);`
- return values
  - use `.and` to start a "strategy":
    - **returnValue(s)**: `.and.returnValue(42)`, `.and.returnValues`
    - **resolveTo**, **rejectWith** (for promises): `.and.resolveTo(aPromise)`
    - **throwError**
    - **callThrough** (call the original function, by default it acts as a _stub_ only)
  - only react to a fixed set of parameters:  
    `.withArgs(1, 2, 3).and.`
