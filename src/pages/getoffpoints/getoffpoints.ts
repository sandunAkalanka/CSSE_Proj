import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the GetoffpointsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-getoffpoints',
  templateUrl: 'getoffpoints.html',
})
export class GetoffpointsPage {

  // map elements
  @ViewChild("gopmap") mapElement;
  gopmap: any;
  
  bckendIp;
  userNIC;
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient: HttpClient) {
    this.bckendIp = localStorage.getItem('backendip'); // backend ip
    this.userNIC = localStorage.getItem('userNIC'); // user's nic
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad GetoffpointsPage');
    this.getDetails();
  }

  getDetails() {
    // get all journey details
    this.httpClient.get('http://' + this.bckendIp + ':3001/journeyhistory/' + this.userNIC).subscribe(data => {
      // console.log(data['data']);
      var journeyCount = Object.keys(data['data']).length;
      var journeys = data['data'];
      
      // check if any journeys exist
      if (journeyCount > 0) {
        document.getElementById('gipcount').innerHTML = 'No of Points :' + journeyCount; // display no of journeys

        let latLng = new google.maps.LatLng(journeys[0].endLat, journeys[0].endLong); // generate map with default view
        let mapOptions = {
          center: latLng,
          zoom: 7,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.gopmap = new google.maps.Map(this.mapElement.nativeElement, mapOptions); // display generated map

        // add markers to the map
        for (let i = 0; i < journeyCount; i++) {
          var startPoint = new google.maps.Marker({ position: new google.maps.LatLng(journeys[i].endLat, journeys[i].endLong), title: "End" });
          startPoint.setMap(this.gopmap);
        }
      }
    });
  }

}
