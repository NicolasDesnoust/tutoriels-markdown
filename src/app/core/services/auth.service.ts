import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { from } from 'rxjs';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }

  /**
   * Login with email/password
   */
  login(email: string, password: string) {
    const loginRequest$ = from(
      this.afAuth.signInWithEmailAndPassword(email, password)
    );

    loginRequest$.subscribe(
      (res) => this.router.navigate(['/']),
      (err) => window.alert(err.message)
    );

    return loginRequest$;
  }

  logout() {
    const logoutRequest$ = from(this.afAuth.signOut());

    // * This subscribe also makes sure the logout() is executed
    logoutRequest$.subscribe(
      (res) => {
        this.localStorageService.clear();
      },
      (err) => window.alert(err.message)
    );

    this.router.navigate(['auth/login']);

    return logoutRequest$;
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  // setUserData(user) {
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(
    //   `users/${user.uid}`
    // );
    // const userData: User = {
    //   uid: user.uid,
    //   email: user.email,
    //   displayName: user.displayName,
    //   photoURL: user.photoURL,
    //   emailVerified: user.emailVerified,
    // };
    // return userRef.set(userData, {
    //   merge: true,
    // });
  // }
}
