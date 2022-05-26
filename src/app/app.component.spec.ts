import { Location } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { HomeComponent } from './components/home/home.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ThresholdWarningComponent } from './components/threshold-warning/threshold-warning.component';
import { TranslateComponent } from './components/translate/translate.component';
import { TranslatePipe } from './pipes/transalte.pipe';
import { TranslateService } from './services/translate.service';

fdescribe('AppComponent', () => {

  let homeComponent: HomeComponent;
  let homeFixture: ComponentFixture<HomeComponent>;
  let fixture: ComponentFixture<AppComponent>;
  let translateComponent: TranslateComponent;
  let translateFixture: ComponentFixture<TranslateComponent>;
  let router: Router;
  let auth: AuthService;
  // let route: ActivatedRoute;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          {
            path: 'translate', component: TranslateComponent
          },
          {
            path: 'abc', redirectTo: '', pathMatch: 'full'
          },
          {
            path: '', component: HomeComponent
          }
        ])
      ],
      declarations: [
        AppComponent,
        SignupFormComponent,
        ThresholdWarningComponent,
        TranslateComponent,
        HomeComponent,
        TranslatePipe
      ],
      providers: [
        TranslateService,
        HttpClient,
        AuthService
      ]
    }).compileComponents();

    homeFixture = TestBed.createComponent(HomeComponent);
    homeComponent = homeFixture.componentInstance;
    translateFixture = TestBed.createComponent(TranslateComponent);
    translateComponent = translateFixture.componentInstance;
    router = TestBed.inject(Router);
    auth = TestBed.inject(AuthService);
    // route = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(AppComponent);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-TDD'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-TDD');
  });

  xit('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-TDD app is running!');
  });

  it('navigate to "/translate"', fakeAsync(() => {
    router.navigate(["translate"],{queryParams: {id: auth.isLoggedIn}});
    tick();
    expect(location.path()).toBe("/translate?id=1");
  }));

  it('navigate to "/translate" by click on routerLink', fakeAsync(() => {
    fixture.debugElement.query(By.css('#translate')).nativeElement.click();
    tick();
    expect(location.path()).toBe("/translate");
  }));

  it('navigate to "/abc" which shoule redirect to home', fakeAsync(() => {
    router.navigate(["abc"]);
    tick();
    expect(location.path()).toBe("/");
  }));

  it('navigate to "/"', fakeAsync(() => {
    router.navigate(["/"]).then(() => {
      expect(location.path()).toBe("/");
    });
  }));
});
