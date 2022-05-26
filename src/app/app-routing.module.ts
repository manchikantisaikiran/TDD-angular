import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ThresholdWarningComponent } from './components/threshold-warning/threshold-warning.component';
import { TranslateComponent } from './components/translate/translate.component';
import { NoAccessComponent } from './no-access/no-access.component';

export const routes: Routes = [
  {
    path:'',
    canActivate:[AuthGuard],
    canActivateChild: [AuthGuard],
    children:[
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
    ]
  },
  {
    path: 'no-access',
    component: NoAccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
