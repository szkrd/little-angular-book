import { Routes } from '@angular/router';
import { UserSettingsPageComponent } from './user-settings-page/user-settings-page.component';
import { TrashbinPageComponent } from './trashbin-page/trashbin-page.component';

export const routes: Routes = [
  { path: 'user-settings', component: UserSettingsPageComponent },
  { path: 'trashbin', component: TrashbinPageComponent },
];
