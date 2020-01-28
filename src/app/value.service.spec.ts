import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';
import { MasterService } from './master.service';

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

describe('依存関係を持つサービスのテスト', () => {
  let masterService: MasterService;

  /**
   * 方法1
   * newを使用してValueServiceを作成して、それをMasterServiceコンストラクターに渡しています。
   */
  it('#getValueは文字列を返します ', () => {
    masterService = new MasterService(new ValueService());
    expect(masterService.getValue()).toBe('Hello world');
  });

  /**
   * 方法2
   * ダミーの値を仕様
   */
  it('#getValueは文字列を返します（FakeValue） ', () => {
    const fake = { getValue: () => 'Hello world' };
    masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('Hello world');
  });

  /**
   * 依存性をモックしたり、ダミーの値を使用したり
   * 適切なサービスのメソッドのスパイを作成することができます。
   */
  it('#getValueは文字列を返します（Spy）', () => {
    // Spyを作成
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    // Spyが呼び出された際に返す値
    const stabValue = 'Hello world';
    valueServiceSpy.getValue.and.returnValue(stabValue);

    masterService = new MasterService(valueServiceSpy);

    expect(masterService.getValue()).toBe(stabValue);
  });
});
