import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThresholdWarningComponent } from '../components/threshold-warning/threshold-warning.component';
import { findEl, setFieldValue } from '../spec-helpers/element-spec-helper';
import { ThresholdWarningDirective } from './threshold-warning.directive';

describe('ThresholdWarningDirective', () => {
  let fixture: ComponentFixture<ThresholdWarningComponent>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThresholdWarningDirective, ThresholdWarningComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThresholdWarningComponent);
    fixture.detectChanges();
    input = findEl(fixture, 'input').nativeElement;
  });

  it('does not set the class initially', () => {
    expect(input.classList.contains('overThreshold')).toBe(false);
  });

  it('adds the class if the number is over the threshold', () => {
    setFieldValue(fixture, 'input', '11');
    fixture.detectChanges();
    expect(input.classList.contains('overThreshold')).toBe(true);
  });

  it('removes the class if the number is at the threshold', () => {
    setFieldValue(fixture, 'input', '10');
    fixture.detectChanges();
    expect(input.classList.contains('overThreshold')).toBe(false);
  });
});
