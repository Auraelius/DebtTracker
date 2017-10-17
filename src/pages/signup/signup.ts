import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  Loading,
  LoadingController,
  Alert,
  AlertController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    formBuilder: FormBuilder,
    public authProvider: AuthProvider
  ) {
    this.signupForm = formBuilder.group({
      email: ['', Validators.required],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  signupUser(): void {
    if (!this.signupForm.valid) {
      // todo should we log validation errors? What can we learn?
      console.log("Signup form validation error", this.signupForm.value);
    } else {
      const email: string = this.signupForm.value.email;
      const password: string = this.signupForm.value.password;

      // we get here because they tried something that requires authentication and they needed to create an account. Since they already have an anonymous account, we need to get an email and password, then link these creds to their anon account, then send them back to whereever they were when the linkage is ready.

      this.authProvider.linkAccount(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
            this.navCtrl.pop();
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            // todo should we log signup errors? What can we learn?
            // todo create a more user-friendly experience
            // what do these error messages look like?
            console.log("Signup error: ", error.message);

            var errorMessage: string = error.message;
            const alert: Alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: 'Ok',
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        }
      );
      // show the loading notice while we wait for promises to return
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
}
