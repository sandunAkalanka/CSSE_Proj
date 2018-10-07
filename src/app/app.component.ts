import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { journeyHandler } from '../pages/journeyHandler/journeyHandler';
import { MapPage } from '../pages/map/map';
import { SignInPage } from '../pages/SignIn/SignIn';
import { PayHomePage } from '../pages/payhome/home';
import { ResetPwdPage } from '../pages/ResetPwd/ResetPwd';

import { HistoryPage } from '../pages/history/history';
import { ProfileViewPage } from '../pages/profile-view/profile-view';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SignInPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Profile', component: ProfileViewPage },
      { title: 'Reload', component: PayHomePage },
      { title: 'Journey', component: journeyHandler },
      { title: 'View History', component: HistoryPage }
    ];
    // this.pages = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'Profile', component: ProfileViewPage },
    //   // { title: 'List', component: ListPage },
    //   { title: 'Journey', component: journeyHandler },
    //   { title: 'Map', component: MapPage },
    //   { title: 'View History', component: HistoryPage },

    //   { title: 'SignIn', component: SignInPage },
    //   { title: 'SignUp', component: SignUpPage },
    //   { title: 'ResetPwd', component: ResetPwdPage }
    // ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      localStorage.setItem('backendip','localhost');
      // localStorage.setItem('backendip','192.168.137.1');
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
}
