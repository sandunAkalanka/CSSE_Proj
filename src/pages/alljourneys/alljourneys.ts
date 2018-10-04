import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ViewselectedjourneyPage } from '../viewselectedjourney/viewselectedjourney';

/**
 * Generated class for the AlljourneysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alljourneys',
  templateUrl: 'alljourneys.html',
})
export class AlljourneysPage {

  bckendIp;
  journeyCount;
  journeys;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
    this.bckendIp = localStorage.getItem('backendip');
    this.showJourneys();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlljourneysPage');
  }

  showJourneys() {
    this.httpClient.get('http://' + this.bckendIp + ':3001/journeyhistory/952033310V').subscribe(data => {
      // console.log(data['data']);
      this.journeyCount = Object.keys(data['data']).length;
      this.journeys = data['data'];
    });
  }

  journeySelected(journey: string) {
    // console.log("Selected Item", journey);
    this.navCtrl.push(ViewselectedjourneyPage,{
      selJourneyObj: journey
    });
  }

}
