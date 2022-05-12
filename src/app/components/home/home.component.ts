import { Component, OnInit, Pipe } from '@angular/core';

// @Pipe({
//   name:'square'
// })
// export class SquarePipe{
//   transform(val:number[]){
//     return val.filter((v)=> v%2 === 0);
//   }
// }
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dynamiCounter: number[] = [1,2,3,4];
  count= 5;
  constructor() {
    // setInterval(()=>{
    //   console.log(this.dynamiCounter)
    //   this.dynamiCounter.push(this.count++);
    // },1000)
   }

  ngOnInit(): void {
  }

  handleCountChange(count: number): void {
    console.log('countChange event from CounterComponent', count);
  }
}
