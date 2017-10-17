import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // When the user opens the app, it does not go straight to the HomePage, it should listen to the authentication state and then decide where to take the user.
  rootPage:any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    afAuth: AngularFireAuth
  ) {
    // The subscribe function will listen for authentication changes, if there’s a logged-in user the app will send her to the HomePage if not, she will get redirected to the LandingPage where she will be able to either log-in or start using the app anonymously.

    // Did you notice that we are assigning the home page by its class name, but the login page is a string? That is because of how code splitting works, all of our pages, except HomePage, are declared in their page modules. To call those pages, we need to use the string name they have, by default, that name is the same their class name.

    // it will stop listening to the authentication state unless you run it again (it runs every time someone opens the app). because if there’s a sudden change in the authentication state (like when we link to an email or if user changes their email or password) this function would trigger.

    const authListener = afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = HomePage;
        authListener.unsubscribe();
      } else {
        this.rootPage = 'LandingPage';
        authListener.unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

