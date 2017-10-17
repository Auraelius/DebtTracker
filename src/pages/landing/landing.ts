import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  Loading,
  LoadingController 
} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider
  ) {}

  goToLogin(): void {
    this.navCtrl.push('LoginPage');
  }

   // create a loading notification, do an anonymous login and, when it's ready, dismiss the loading notice and set the navigation root to the homepage 
  goToBillList(): void {
    this.authProvider.anonymousLogin().then(newUser => {
      loading.dismiss().then(() => {
        this.navCtrl.setRoot(HomePage);
      });
    });

    const loading: Loading = this.loadingCtrl.create();
    loading.present();
  }
}
