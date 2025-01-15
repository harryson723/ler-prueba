import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private userCreatedSubject = new Subject<any>();

  userCreated$ = this.userCreatedSubject.asObservable();

  notifyUserCreated(user: any) {
    this.userCreatedSubject.next(user);
  }
}
