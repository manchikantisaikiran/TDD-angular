import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-threshold-warning',
  templateUrl: './threshold-warning.component.html',
  styleUrls: ['./threshold-warning.component.scss']
})
export class ThresholdWarningComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

}
