import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocalStorageService } from './local-storage.service';
import { Logger } from './startup/logger.service';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<firebase.User | null>;

  constructor(
    private localStorageService: LocalStorageService,
    private logger: Logger,
    private firebaseAuth: AngularFireAuth
  ) {
    this.userSubject = new BehaviorSubject<firebase.User | null>(null);
    this.firebaseAuth.user.subscribe(this.userSubject);

    // this.initUserSubjectFromLocalStorage();
  }

  // private initUserSubjectFromLocalStorage() {
  //   const user: User = this.localStorageService.get(USER_KEY);
  //   this.userSubject = new BehaviorSubject<User | null>(user);
  // }

  // setUser(user: User | null) {
  //   this.logger.info(JSON.stringify(user));
  //   this.userSubject.next(user);
  //   this.localStorageService.set(USER_KEY, user);
  // }

  getUser$(): Observable<firebase.User | null> {
    return this.userSubject.asObservable();
  }

  isLoggedIn$(): Observable<boolean> {
    return this.getUser$().pipe(map((user) => (user ? true : false)));
  }

  isLoggedIn(): boolean {
    return this.userSubject.value ? true : false;
  }
}
