import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { DemoPageComponent } from './pages/demo-page/demo-page.component';
import { AnotherPageComponent } from './pages/another-page/another-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'another', component: AnotherPageComponent },
  { path: 'demo', component: DemoPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
