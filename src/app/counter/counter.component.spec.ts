import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { take, toArray } from 'rxjs/operators'

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let debugElement: DebugElement;

  const startCount = 123;

  // Arrange
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    component.startCount = startCount;
    debugElement = fixture.debugElement;

    // Call ngOnChanges, then re-render
    component.ngOnChanges();
    
    fixture.detectChanges();
  });

  it('should create', () => {
    //assert
    expect(component).toBeTruthy();
  });

  it('shows the start count', () => {
    //assert
    expect(debugElement.query(By.css('[data-testid="count"]')).nativeElement.textContent).toBe(String(startCount));
  });

  it('increments the count', () => {
    // Act
    const incrementButton = debugElement.query(
      By.css('[data-testid="increment-button"]')
    );
    incrementButton.triggerEventHandler('click', null);
    // Re-render the Component
    fixture.detectChanges();

    // Assert
    const countOutput = debugElement.query(By.css('[data-testid="count"]'));
    expect(countOutput.nativeElement.textContent).toBe(String(startCount + 1));
  });

  it('decrements the count', () => {
    // Act
    const decrementButton = debugElement.query(
      By.css('[data-testid="decrement-button"]')
    );
    decrementButton.triggerEventHandler('click', null);
    // Re-render the Component
    fixture.detectChanges();
  
    // Assert
    const countOutput = debugElement.query(
      By.css('[data-testid="count"]')
    );
    expect(countOutput.nativeElement.textContent).toBe(String(startCount - 1));
  });

  it('resets the count', () => {
    const newCount = '123';
  
    // Act
    const resetInputEl = debugElement.query(By.css('[data-testid="reset-input"]')).nativeElement;
    const resetButtonEl = debugElement.query(By.css('[data-testid="reset-button"]'));
    
    // Set field value
    resetInputEl.value = newCount;
    
    // Dispatch input event
    resetInputEl.dispatchEvent(new Event('input'));

    //using helper function for set and dispatch input value
    // setFieldValue(fixture, 'reset-input', newCount);
  
    // Click on reset button
    resetButtonEl.triggerEventHandler('click',null)
    
    // Re-render the Component
    fixture.detectChanges();
  
    // Assert
    expect(debugElement.query(By.css('[data-testid="count"]')).nativeElement.textContent).toBe(newCount)
  });

  it('does not reset if the value is not a number', () => {
    const value = 'not a number';
    component.startCount = 10;
  
    // Act
    const resetInputEl = debugElement.query(By.css('[data-testid="reset-input"]')).nativeElement;
    const resetButtonEl = debugElement.query(By.css('[data-testid="reset-button"]'));
    resetInputEl.value = '123';
    resetInputEl.dispatchEvent(new Event('input'));
    resetButtonEl.triggerEventHandler('click', null);
    fixture.detectChanges();
  
    // Assert
    const countOutput = debugElement.query(By.css('[data-testid="count"]'));
    expect(countOutput.nativeElement.textContent).toBe(String(startCount))
  });

  it('emits countChange events on increment', () => {
    // Arrange
    let actualCount: number | undefined;
    component.countChange.subscribe((count: number) => {
      actualCount = count;
    });
  
    // Act
    const incrementButtonEl = debugElement.query(By.css('[data-testid="increment-button"]'));
    incrementButtonEl.triggerEventHandler('click', null);
  
    // Assert
    expect(actualCount).toBe(startCount + 1);
  });

  it('emits countChange events on decrement', () => {
    // Arrange
    let actualCount: number | undefined;
    component.countChange.subscribe((count: number) => {
      actualCount = count;
    });
  
    // Act
    const decrementButtonEl = debugElement.query(By.css('[data-testid="decrement-button"]'));
    decrementButtonEl.triggerEventHandler('click', null);
  
    // Assert
    expect(actualCount).toBe(startCount -1);
  });
  
  it('emits countChange events on reset', () => {
    const newCount = 123;
  
    // Arrange
    let actualCount: number | undefined;
    component.countChange.subscribe((count: number) => {
      actualCount = count;
    });
  
    // Act
    const resetInputEl = debugElement.query(By.css('[data-testid="reset-input"]')).nativeElement;
    const resetButtonEl = debugElement.query(By.css('[data-testid="reset-button"]'));
    resetInputEl.value = newCount;
    resetInputEl.dispatchEvent(new Event('input'));
    resetButtonEl.triggerEventHandler('click', null);
  
    // Assert
    expect(actualCount).toBe(newCount);
  });

  it('emits countChange events', () => {
    // Arrange
    const newCount = 123;
  
    // Capture all emitted values in an array
    let actualCounts: number[] | undefined;
  
    // Transform the Observable, then subscribe
    component.countChange.pipe(
      // Close the Observable after three values
      take(3),
      // Collect all values in an array
      toArray()
    ).subscribe((counts) => {
      actualCounts = counts;
    });
  
    // Act
    const incrementButtonEl = debugElement.query(By.css('[data-testid="increment-button"]'));
    const decrementButtonEl = debugElement.query(By.css('[data-testid="decrement-button"]'));
    const resetInputEl = debugElement.query(By.css('[data-testid="reset-input"]')).nativeElement;
    const resetButtonEl = debugElement.query(By.css('[data-testid="reset-button"]'));

    incrementButtonEl.triggerEventHandler('click', null);
    decrementButtonEl.triggerEventHandler('click', null);
    resetInputEl.value = newCount;
    resetInputEl.dispatchEvent(new Event('input'));
    resetButtonEl.triggerEventHandler('click', null);
  
    // Assert
    expect(actualCounts).toEqual([startCount + 1, startCount, newCount]);
  });

});
