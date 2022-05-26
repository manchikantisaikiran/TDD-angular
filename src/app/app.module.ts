import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoriteMoviesComponent } from './components/favorite-movies/favorite-movies.component';
import { CounterComponent } from './components/counter/counter.component';
import { HomeComponent } from './components/home/home.component';
import { ServiceCounterComponent } from './components/service-counter/service-counter.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ControlErrorsComponent } from './components/control-errors/control-errors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageDirective } from './directives/error-message.directive';
import { HttpClientModule } from '@angular/common/http';
import { ThresholdWarningDirective } from './directives/threshold-warning.directive';
import { ThresholdWarningComponent } from './components/threshold-warning/threshold-warning.component';
import { AppPaginateDirective } from './directives/app-paginate.directive';
import { TranslatePipe } from './pipes/transalte.pipe';
import { TranslateComponent } from './components/translate/translate.component';
import { TranslateService } from './services/translate.service';
import { NoAccessComponent } from './no-access/no-access.component';

@NgModule({
  declarations: [
    AppComponent,
    FavoriteMoviesComponent,
    CounterComponent,
    HomeComponent,
    ServiceCounterComponent,
    SignupFormComponent,
    ControlErrorsComponent,
    ErrorMessageDirective,
    ThresholdWarningComponent,
    ThresholdWarningDirective,
    AppPaginateDirective,
    TranslatePipe,
    TranslateComponent,
    NoAccessComponent,
    // SquarePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
