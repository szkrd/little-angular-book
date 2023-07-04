import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoPageComponent } from './pages/demo-page/demo-page.component';
import { AnotherPageComponent } from './pages/another-page/another-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ButtonComponent } from './components/button/button.component';
import {StandaloneButtonComponent} from "./components/standalone-button/standalone-button.component";
import {ColoredTextComponent} from "./components/standalone-button/colored-text/colored-text.component";
import { LogDomDirective } from './directives/log-dom.directive';

@NgModule({
  declarations: [
    AppComponent,
    DemoPageComponent,
    AnotherPageComponent,
    ProfilePageComponent,
    ButtonComponent,
    LogDomDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, StandaloneButtonComponent, ColoredTextComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
