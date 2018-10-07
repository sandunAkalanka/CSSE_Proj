import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfileViewPage } from '../profile-view/profile-view';
import { journeyHandler } from '../journeyHandler/journeyHandler';
import { HistoryPage } from '../history/history';
import { SignInPage } from '../SignIn/SignIn';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToProfileView() {
    this.navCtrl.setRoot(ProfileViewPage);
  }

  goToPayments() {
    this.navCtrl.setRoot(ProfileViewPage);
  }

  startJourney() {
    this.navCtrl.setRoot(journeyHandler);
  }

  viewHistory() {
    this.navCtrl.setRoot(HistoryPage);
  }

  signout() {
    localStorage.removeItem("userNIC");
    localStorage.removeItem("userFName");
    localStorage.removeItem("userLName");
    this.navCtrl.setRoot(SignInPage);
  }

}
