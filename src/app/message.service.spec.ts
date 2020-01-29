import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { MessageResponse, MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(MessageService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('#getMessageは文字列を返す', () => {
    // ダミーのレスポンス
    const messageResponse: MessageResponse = { message: 'Hello testing!!' };
    // HTTP GET リクエストを作成
    service.getMessage().subscribe(data => {
      // 結果はテストデータと一致する必要がある
      expect(data).toEqual('Hello testing!!');
    });

    // RequestMethodとURLが正しいか
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: './assets/data/message.json'
    });

    // 実行する
    req.flush(messageResponse);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
