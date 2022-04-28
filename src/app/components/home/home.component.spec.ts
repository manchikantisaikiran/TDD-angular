import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders an independent counter', () => {
    const counter = debugElement.query(By.css('app-counter'));
    expect(counter).toBeTruthy();
  });

  it('passes a start count', () => {
    const counter = debugElement.query(By.css('app-counter'));
    expect(counter.properties.startCount).toBe(6);
  });

  it('listens for count changes', () => {
    spyOn(console, 'log');
    const counter = debugElement.query(By.css('app-counter'));
    const count = 5;
    counter.triggerEventHandler('countChange', count);
    expect(console.log).toHaveBeenCalledWith(
      'countChange event from CounterComponent',
      count,
    );
  });

  it('renders a service counter', () => {
    const serviceCounter = debugElement.query(By.css('app-service-counter'));
    expect(serviceCounter).toBeTruthy();
  });
});
