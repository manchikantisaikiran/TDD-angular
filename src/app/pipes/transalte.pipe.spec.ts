import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TranslateComponent } from '../components/translate/translate.component';
import { TranslateService, Translations } from '../services/translate.service';
import { expectContainedText, expectContent, expectText } from '../spec-helpers/element-spec-helper';
import { TranslatePipe } from './transalte.pipe';

const key1 = 'key1';
const key2 = 'key2';

describe('TranslatePipe: direct test', () => {
  let translatePipe: TranslatePipe;

  let changeDetectorRef: Pick<ChangeDetectorRef, 'markForCheck'>;
  let translateService: Pick<TranslateService, 'onTranslationChange' | 'get'>;

  beforeEach(() => {
    changeDetectorRef = {
      markForCheck(): void {},
    };

    translateService = {
      onTranslationChange: new BehaviorSubject<Translations>({}),
      get(key: string): Observable<string> {
        return of(`Translation for ${key}`);
      },
    };

    spyOn(changeDetectorRef, 'markForCheck');

    translatePipe = new TranslatePipe(
      changeDetectorRef as ChangeDetectorRef,
      translateService as TranslateService,
    );
  });

  it('translates the key, sync service response', () => {
    const translation = translatePipe.transform(key1);
    expect(translation).toBe('Translation for key1');
    expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
  });

  it('translates the key, async service response', fakeAsync(() => {
    translateService.get = (key) => of(`Async translation for ${key}`).pipe(delay(100));

    const translation1 = translatePipe.transform(key1);
    expect(translation1).toBe(null);

    tick(100);

    const translation2 = translatePipe.transform(key1);
    expect(translation2).toBe('Async translation for key1');
  }));

  it('gets a translation for a key only once', () => {
    spyOn(translateService, 'get').and.callThrough();

    const translation1 = translatePipe.transform(key1);
    expect(translation1).toBe('Translation for key1');
    expect(translateService.get).toHaveBeenCalledTimes(1);

    const translation2 = translatePipe.transform(key2);
    expect(translation2).toBe('Translation for key2');
    expect(translateService.get).toHaveBeenCalledTimes(2);
  });

  it('translates a changed key', () => {
    const translation1 = translatePipe.transform(key1);
    expect(translation1).toBe('Translation for key1');

    const translation2 = translatePipe.transform(key2);
    expect(translation2).toBe('Translation for key2');
  });

  it('updates on translation change', () => {
    const translation1 = translatePipe.transform(key1);
    expect(translation1).toBe('Translation for key1');
    expect(changeDetectorRef.markForCheck).toHaveBeenCalledTimes(1);

    translateService.get = (key) => of(`New translation for ${key}`);
    translateService.onTranslationChange.next({});
    expect(changeDetectorRef.markForCheck).toHaveBeenCalledTimes(2);

    const translation2 = translatePipe.transform(key1);
    expect(translation2).toBe('New translation for key1');
  });
});
