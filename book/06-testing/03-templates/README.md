# Templates

## Standalone service

```typescript
import { TestBed } from '@angular/core/testing';
import { FooBarService } from './foo-bar.service';

describe('FooBarService', () => {
    let loggerServiceMock: jasmine.SpyObj<LoggerService>;

    beforeEach(() => {
        loggerServiceMock = jasmine.createSpyObj<LoggerService>('LoggerService', ['error']);

        TestBed.configureTestingModule({
            providers: [
                FooBarService,
                { provide: LoggerService, useValue: loggerServiceMock },
            ],
        });
    });

    it('should create', () => {
        // Assert
        expect(service).toBeInstanceOf(FooBarService);
    });

    describe('something', () => {
        it('should do something', () => {
            // Arrange
            // Act
            // Assert
            expect(1).toBe(1);
        });
    });
});
```

## Standalone component

- Since Angular 19 all components will be (are) standalone by default, the `standalone: true` can be omitted then.
- With `componentRef.setInput` there is no more need for a wrapper component.

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FooBarComponent } from './foo-bar.component';

@Component({
    selector: 'tt-corge-mock-component',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class CorgeMockComponent {}

describe('FooBarComponent', () => {
    let component: FooBarComponent;
    let fixture: ComponentFixture<FooBarComponent>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        routerSpy = jasmine.createSpyObj('router', ['navigateByUrl']);
      
        await TestBed.configureTestingModule({
            imports: [ RouterTestingModule, NoopAnimationsModule ], // angular modules
            providers: [
              { provide: Router, useValue: routerSpy }, // injected deps
              ],
        }).overrideComponent(FooBarComponent, {
            remove: {
                imports: [CorgeComponent], // real children
            },
            add: {
                imports: [CorgeMockComponent], // mock children
            },
        }).compileComponents();

        fixture = TestBed.createComponent(FooBarComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('fooInput', { foo: 42 });
    });

    it('should create', () => {
        // Assert
        expect(component).toBeInstanceOf(FooBarComponent);
    });

    describe('something', () => {
        it('should do something', () => {
            // Arrange
            // Act
            // Assert
            expect(1).toBe(1);
        });
    });
});
```
