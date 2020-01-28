import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValueService = TestBed.get(ValueService);
    expect(service).toBeTruthy();
  });

  it('#getValueは文字列を返します', () => {
    const service: ValueService = TestBed.get(ValueService);
    expect(service.getValue()).toBe('Hello world');
  });

  it('#getObservableValueはObservableを返します', (done: DoneFn) => {
    const service: ValueService = TestBed.get(ValueService);
    service.getObservableValue().subscribe(value => {
      expect(value).toBe('Hello world');
      done();
    });
  });

  it('#getPromiseValue', async (done: DoneFn) => {
    const service: ValueService = TestBed.get(ValueService);
    expect(await service.getPromiseValue()).toBe('Hello world');
    done();
  });
});
