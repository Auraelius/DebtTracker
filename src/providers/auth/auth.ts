import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

  constructor(
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase
  ) {
    console.log('Hello AuthProvider Provider');
  }

  // To foster engagement, some features are available anonymously. Additional features require authentication. Still others will require in-app subscription. Everybody gets an anonymous login when they use the app. Later, when they decide to identify themselves, their email and password link to their existing anonymous account.

  // create an anonymous account in Firebase, store the auth object inside the user’s localStorage
  anonymousLogin(): Promise<any> {
    return this.afAuth.auth.signInAnonymously();
  }

  //link given email & password credentials to the already existing anonymous account:
  linkAccount(email: string, password: string): Promise<any> {
    // create credentials
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    // link creds to current user account, then store email in profile 
    return this.afAuth.auth.currentUser.linkWithCredential(credential).then(
      user => {
        this.afDatabase.object(`/userProfile/${user.uid}/email`).update(email);
      },
      error => {
        // TODO communicate error to user and log via app monitoring
        console.log('There was an error linking the account', error);
      }
    );
  }

  getUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  resetPassword(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}
