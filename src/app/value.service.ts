import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {
  constructor() {}

  getValue(): string {
    return 'Hello world';
  }

  getObservableValue(): Observable<string> {
    return of('Hello world');
  }

  async getPromiseValue(): Promise<string> {
    return 'Hello world';
  }
}
