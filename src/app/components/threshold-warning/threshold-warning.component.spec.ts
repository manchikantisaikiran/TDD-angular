import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThresholdWarningComponent } from './threshold-warning.component';

describe('ThresholdWarningComponent', () => {
  let component: ThresholdWarningComponent;
  let fixture: ComponentFixture<ThresholdWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThresholdWarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThresholdWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
