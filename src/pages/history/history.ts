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
    console.log('ionViewDidLoad HistoryPage');
    localStorage.setItem('userNIC','952033310v');
  }

  openProfileView(){
    this.navCtrl.push(ProfileViewPage);
  }

  openLastJourney(){
    this.navCtrl.push(LastjourneyPage);
  }

  openAllJourneys(){
    this.navCtrl.push(AlljourneysPage);
  }

  openGetInPoints(){
    this.navCtrl.push(GetinpointsPage);
  }

  openGetOffPoints(){
    this.navCtrl.push(GetoffpointsPage);
  }

}
