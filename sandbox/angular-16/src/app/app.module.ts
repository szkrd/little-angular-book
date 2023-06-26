import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoobarComponent } from './foobar/foobar.component';
import { DemoPageComponent } from './pages/demo-page/demo-page.component';
import { AnotherPageComponent } from './pages/another-page/another-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FoobarComponent,
    DemoPageComponent,
    AnotherPageComponent,
    ProfilePageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
