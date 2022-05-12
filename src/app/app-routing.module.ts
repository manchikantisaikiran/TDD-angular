import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ThresholdWarningComponent } from './components/threshold-warning/threshold-warning.component';
import { TranslateComponent } from './components/translate/translate.component';

const routes: Routes = [
  {
    path:'signup',component:SignupFormComponent
  },
  {
    path:'threshold-warning',component:ThresholdWarningComponent
  },
  {
    path:'translate',component:TranslateComponent
  },
  {
  path:'',component:HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
