import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent{
  
  key:any;

  constructor(private translateService: TranslateService) {}

  public useLanguage(event: Event): void {
    if (!(event.target instanceof HTMLSelectElement)) {
      throw new Error('Event target is not a select element');
    }
    const language = event.target.value;
    this.translateService.use(language);
  }
}
