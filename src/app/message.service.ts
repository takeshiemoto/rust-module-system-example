import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface MessageResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) {}

  getMessage(): Observable<string> {
    return this.http
      .get<MessageResponse>('./assets/data/message.json')
      .pipe(map(messageResponse => messageResponse.message));
  }
}
