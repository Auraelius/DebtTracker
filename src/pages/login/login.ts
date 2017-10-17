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
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loginForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController
  ) {
    // make the form with validators to meet Firebase min passwordlength of six
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }

  loginUser(): void {
    if (!this.loginForm.valid) {
      // todo should we log validation errors? What can we learn?
      console.log("Login form validation error", this.loginForm.value);
    } else { 
      // form validates
      const email: string = this.loginForm.value.email;
      const password: string = this.loginForm.value.password;

      // let's use the email and password to log in, putting up a loading notice while we wait, and dismissing it either when login is successful or when we have to report a login error

      this.authProvider.loginUser(email, password).then(
        () => {
          // we're logged in. Clear the loading notice and go home.
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(HomePage);
          });
        },
        error => { 
          // login didn't work.
          this.loading.dismiss().then(() => {
            // todo should we log login errors? What can we learn?
            // todo create a more user-friendly experience
            // what do these error messages look like?
            console.log("Login error: ", error.message);
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
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
