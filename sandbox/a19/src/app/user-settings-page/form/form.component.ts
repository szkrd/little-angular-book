import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, ReactiveFormsModule, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  // after inject

  // takeUntilDestroyed can only be used in injection-context (here or in a constructor, but not in a method);
  // we need this for when the user navigates to the form route root (no query params)
  readonly queryParamSubscriber = this.activatedRoute.queryParams
    .pipe(takeUntilDestroyed())
    .subscribe((queryParams) => {
      if (Object.keys(queryParams).length === 0) {
        this.searchForm.reset();
      }
    });

  // ---

  ngOnInit(): void {
    this.useQueryParams();
  }

  onFormSubmit() {
    console.log('Submit form (dispatch event for effect, call api using a service, etc.)');
    this.updateQueryParams();
  }

  onFormReset() {
    console.log('Reset form');
    this.searchForm.reset();
  }

  private updateQueryParams() {
    const queryParams = this.searchForm.getRawValue();
    return this.router.navigate([], { queryParams, relativeTo: this.activatedRoute, replaceUrl: true });
  }

  private useQueryParams() {
    // this (using the snapshot) needs proper routing set up, with router outlet and everything
    const params = this.activatedRoute.snapshot.queryParamMap;
    this.searchForm.controls.userName.setValue((params.get('userName') ?? '').trim());
  }
}
