# Reactive forms

- reactive forms are "mostly set up" in the component's _class_ and not in the html _template_
- where the html form best practices meet with angular reactive forms things can get hairy (native form events, for example)
- in my experience validation related checks (_dirty_, _pristine_, _valid_, _invalid_) are very finicky
- route query handling is always a nice to have, but it's not exactly simple with Angular
- use `new FormGroup` to form a group, and inside that use `new FormControl` to define a form control's behavior

## Example

### Template

- both _reset_ and _submit_ are unintuitive
- `[formGroup]` is used on the form,  
  `formControlName` (without square brackets) is used on the input element
- if a button has no proper type, than that will act as a submit button (standard html, but it's easy to forget)
- if you want to support the traditional way of how forms work, then
  - the submit event is `(ngSubmit)`, which is a wrapper around the real submit:  
    it prevents the form submit bubbling using _preventDefault_ under the hood
  - the reset is `(reset)`, no special wrapper is needed, but the underlying code will need to be kept in sync

```html
<form [formGroup]="searchForm" (ngSubmit)="onFormSubmit()" (reset)="onFormReset()">
  <input formControlName="userName" [style.backgroundColor]="searchForm.controls.userName.dirty && searchForm.controls.userName.errors ? 'red' : 'white'"/>
  <button type="submit" [disabled]="searchForm.invalid">Search</button>
  <button type="reset">Reset</button>
</form>
```

### Component class

- `ReactiveFormsModule` must be imported (this is a standalone component)
- form submit and reset are using the default form behavior
- query params:
  - I'm using activated route _snapshots_: for those to work a proper router must be set up (routes and a route outlet)
  - if all you want is to support page reloading (and NOT back/forward), then snapshots are enough
  - in this example I use `replaceUrl: true` which eliminates the history
  - if you want to support back/forward, then proper subscriptions are needed
  - I _do_ subscribe to the queryParam change here, because if I have a link to this page,
    then that will delete the query params from the url (so I can stay on the page, but I can loose the query params)

```typescript
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class FormComponent implements OnInit {
  searchForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
  });

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly queryParamSubscriber = this.activatedRoute.queryParams.pipe(takeUntilDestroyed()).subscribe(queryParams => {
    if (Object.keys(queryParams).length === 0) this.searchForm.reset();
  })

  ngOnInit(): void {
    this.useQueryParams();
  }

  onFormSubmit() {
    console.log('Submit form (dispatch event for effect, call api using a service, etc.)');
    this.updateQueryParams();
  }

  onFormReset() {
    this.searchForm.reset();
  }

  private updateQueryParams() {
    const queryParams = this.searchForm.getRawValue();
    return this.router.navigate([], { queryParams, relativeTo: this.activatedRoute, replaceUrl: true });
  }

  private useQueryParams() {
    const params = this.activatedRoute.snapshot.queryParamMap;
    this.searchForm.controls.userName.setValue((params.get('userName') ?? '').trim());
  }
}
```
