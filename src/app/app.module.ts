import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'; 
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from './credentials';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { BillProvider } from '../providers/bill/bill';

// remove this when testing in devices
class CameraMock extends Camera {
  getPicture(options) {
    return new Promise((resolve, reject) => {
      resolve(`iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAABmJLR0QAA
        AAAAAD5Q7t/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAUklEQVR4nGM4QAFgAOL/uMG
        7d+8gJCZAaMZrARaArhmXzVjtpLtmiAiZmiH6ydf8jhKbqaoZzscEWE2E2zeqeWA0k
        wRQNOMCWG2G28+A1wICAAAS2y1ybs6L0AAAAABJRU5ErkJggg==`);
    });
  }
}

// An NgModule class describes how the application parts fit together. Every application has at least one NgModule, the root module that you bootstrap to launch the application. You can call it anything you want. The conventional name is AppModule. @NgModule takes a metadata object that tells Angular how to compile and launch the application. 1) imports — the BrowserModule that this and every application needs to run in a browser. 2) declarations — the application's lone component, which is also ... 3) bootstrap — the root component that Angular creates and inserts into the index.html host web page.

@NgModule({
  // You tell Angular which components belong to the AppModule by listing it in the module's declarations array. Only declarables — components, directives and pipes — belong in the declarations array. Do not put any other kind of class in declarations; not NgModule classes, not service classes, not model classes.
  declarations: [ 
    MyApp,
    HomePage
  ],
  // Only NgModule classes go in the imports array
  imports: [ 
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireAuthModule, 
    AngularFireDatabaseModule
  ],
  // the root component that Angular creates and inserts into the index.html host web page.  Among other things, the bootstrapping process creates the component(s) listed in the bootstrap array and inserts each one into the browser DOM. Each bootstrapped component is the base of its own tree of components. Inserting a bootstrapped component usually triggers a cascade of component creations that fill out that tree.
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  //  If you add a provider to the bootstrap then a single instance of the service will be created that all components in the application will share (https://www.joshmorony.com/an-in-depth-explanation-of-providers-in-ionic-2/ ) You must import the provider into app.module.ts and add it to the providers array. You must import the provider into any component that uses it. You must inject the provider in the constructor of any component that is using it
  providers: [
    StatusBar,
    SplashScreen,
    { provide: Camera, useClass: CameraMock },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    BillProvider
  ]
})
export class AppModule {}
