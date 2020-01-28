import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';
import SpyObj = jasmine.SpyObj;

describe('MasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterService = TestBed.get(MasterService);
    expect(service).toBeTruthy();
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

describe('TestBedを利用', () => {
  let masterService: MasterService;
  let valueServiceSpy: SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);

    /**
     * テストやモックしたいサービスの配列を
     * providersメタデータプロパティにセットします。
     * 例: MasterServiceが依存しているValueServiceのSpyをTestBedで設定
     */
    TestBed.configureTestingModule({
      providers: [{ provide: ValueService, useValue: spy }]
    });
    masterService = TestBed.get(MasterService);
    valueServiceSpy = TestBed.get(ValueService);
  });

  it('#getValueは文字列を返します', () => {
    const stabValue = 'My name is John.';
    valueServiceSpy.getValue.and.returnValue(stabValue);
    expect(masterService.getValue()).toBe(stabValue);
  });
});

describe('Setup関数を利用する', () => {
  const setup = () => {
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    const stubValue = 'stub value';
    const masterService = new MasterService(valueServiceSpy);

    valueServiceSpy.getValue.and.returnValue(stubValue);
    return { masterService, stubValue, valueServiceSpy };
  };

  it('#getValueは文字列を返します', () => {
    const { masterService, stubValue } = setup();
    expect(masterService.getValue()).toBe(stubValue);
  });
});
