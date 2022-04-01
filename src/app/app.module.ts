import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ReactiveFormsModule } from '@angular/forms'
import { DrinksIconComponent } from './components/icons/drinks-icon.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component'

@NgModule({
  declarations: [AppComponent, DrinksIconComponent, LoginFormComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
