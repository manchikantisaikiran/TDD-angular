import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';
import { ServiceCounterComponent } from './service-counter/service-counter.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { ControlErrorsComponent } from './control-errors/control-errors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageDirective } from './directives/error-message.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FavoriteMoviesComponent,
    CounterComponent,
    HomeComponent,
    ServiceCounterComponent,
    SignupFormComponent,
    ControlErrorsComponent,
    ErrorMessageDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
