import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LastjourneyPage } from '../lastjourney/lastjourney';
import { AlljourneysPage } from '../alljourneys/alljourneys';
import { GetinpointsPage } from '../getinpoints/getinpoints';
import { GetoffpointsPage } from '../getoffpoints/getoffpoints';
import { ProfileViewPage } from '../profile-view/profile-view';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navCtrl = navCtrl
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HistoryPage');
    localStorage.setItem('userNIC','952033310v'); // set nic of user in case sessions fail to load (testing purposes only)
  }

  openProfileView(){
    // go to profile view page
    this.navCtrl.push(ProfileViewPage);
  }

  openLastJourney(){
    // go to last journey page
    this.navCtrl.push(LastjourneyPage);
  }

  openAllJourneys(){
    // go to all journeys page
    this.navCtrl.push(AlljourneysPage);
  }

  openGetInPoints(){
    // go to get in points page
    this.navCtrl.push(GetinpointsPage);
  }

  openGetOffPoints(){
    // go to get off points page
    this.navCtrl.push(GetoffpointsPage);
  }

}
