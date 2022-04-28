import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterService } from './counter.service';
import { ServiceCounterComponent } from '../service-counter/service-counter.component';
import {
  expectText,
  click,
  setFieldValue,
} from '../spec-helpers/element-spec-helper';

describe('ServiceCounterComponent: integration test', () => {
  let service: CounterService;
  let component: ServiceCounterComponent;
  let fixture: ComponentFixture<ServiceCounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceCounterComponent],
      providers: [CounterService],
    }).compileComponents();

    service = TestBed.inject(CounterService);
    fixture = TestBed.createComponent(ServiceCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shows the start count', () => {
    expectText(fixture, 'count', '0');
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    fixture.detectChanges();
    expectText(fixture, 'count', '1');
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();
    expectText(fixture, 'count', '-1');
  });

  it('resets the count', () => {
    const newCount = 456;
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    fixture.detectChanges(); 
    expectText(fixture, 'count', String(newCount));
  });
});
