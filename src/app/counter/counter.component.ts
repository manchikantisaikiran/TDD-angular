import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  @Input() startCount = 0;

  @Output() countChange = new EventEmitter<number>();

  count = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.count = this.startCount;
  }

  increment(): void {
    this.count++;
    this.notify();
  }

  decrement(): void {
    this.count--;
    this.notify();
  }

  reset(newCount: string): void {
    const count = parseInt(newCount, 10);
    if (!Number.isNaN(count)) {
      this.count = count;
      this.notify();
    }
  }

  private notify(): void {
    this.countChange.emit(this.count);
  }


}
