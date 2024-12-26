import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-user-settings-page',
  templateUrl: './user-settings-page.component.html',
  imports: [CommonModule, FormComponent],
})
export class UserSettingsPageComponent {}
