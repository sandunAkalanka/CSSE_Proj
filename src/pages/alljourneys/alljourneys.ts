import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ViewselectedjourneyPage } from '../viewselectedjourney/viewselectedjourney';
import swal from 'sweetalert2';

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
  userNIC;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
    this.bckendIp = localStorage.getItem('backendip'); // get ip of backend
    this.userNIC = localStorage.getItem('userNIC'); // get user nic from sessions
    this.showJourneys(); // get and show journey details method
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AlljourneysPage');
  }

  showJourneys() {
    // get all journey details from the backend server
    this.httpClient.get('http://' + this.bckendIp + ':3001/journeyhistory/' + this.userNIC).subscribe(data => {
      // console.log(data['data']);
      this.journeyCount = Object.keys(data['data']).length;
      this.journeys = data['data'];
      // check if there are any journeys done by the user
      if (!(this.journeyCount > 0)) {
        // display message stating that there are no journeys
        swal({
          type: 'error',
          title: 'Oops !',
          text: 'You do not have any journeys !'
        });
        this.navCtrl.pop();
      }
    });
  }

  // triggered when a list item is clicked. to show advanced details of the journey
  journeySelected(journey: string) {
    // console.log("Selected Item", journey);
    this.navCtrl.push(ViewselectedjourneyPage, {
      selJourneyObj: journey
    });
  }

}
