import { Location } from '@angular/common';
import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { HomeComponent } from './components/home/home.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ThresholdWarningComponent } from './components/threshold-warning/threshold-warning.component';
import { TranslateComponent } from './components/translate/translate.component';
import { NoAccessComponent } from './no-access/no-access.component';

fdescribe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let auth: AuthService;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        AuthService
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    auth = TestBed.inject(AuthService);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('navigation to translate component is not allowed if not loggedin', fakeAsync(() => {
    auth.isLoggedIn = false;
    router.navigate(['/translate'])
    tick();
    expect(guard.canActivateChild(({} as ActivatedRouteSnapshot),{} as RouterStateSnapshot)).toBe(false);
    expect(location.path()).toBe("/no-access");
    flush();
  }));

  it('navigation to translate component is allowed', fakeAsync(() => {
    auth.isLoggedIn = true;
    router.navigate(['/translate'])
    tick();
    expect(guard.canActivateChild(({} as ActivatedRouteSnapshot),{} as RouterStateSnapshot)).toBe(true);
    expect(location.path()).toBe("/translate");
  }));


});
