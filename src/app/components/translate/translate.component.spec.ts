import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from 'src/app/services/translate.service';

import { TranslateComponent } from './translate.component';

xdescribe('TranslateComponent', () => {
  let component: TranslateComponent;
  let fixture: ComponentFixture<TranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslateComponent ],
      providers:[TranslateService,HttpClient]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const service = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(TranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
