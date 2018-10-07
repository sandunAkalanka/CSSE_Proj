import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the GetinpointsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-getinpoints',
  templateUrl: 'getinpoints.html',
})
export class GetinpointsPage {

  // google map elements
  @ViewChild("gipmap") mapElement;
  gipmap: any;

  bckendIp;
  userNIC;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
    this.bckendIp = localStorage.getItem('backendip'); // ip of the backend
    this.userNIC = localStorage.getItem('userNIC'); // user's nic
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad GetinpointsPage');
    this.getDetails();
  }

  getDetails() {
    // get journey details from the backend
    this.httpClient.get('http://' + this.bckendIp + ':3001/journeyhistory/' + this.userNIC).subscribe(data => {
      // console.log(data['data']);
      var journeyCount = Object.keys(data['data']).length;
      var journeys = data['data'];
      
      // check if any journey details exists
      if (journeyCount > 0) {
        document.getElementById('gipcount').innerHTML = 'No of Points :' + journeyCount; // display journey count

        let latLng = new google.maps.LatLng(journeys[0].startLat, journeys[0].startLong); // draw a map with default view
        let mapOptions = {
          center: latLng,
          zoom: 7,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.gipmap = new google.maps.Map(this.mapElement.nativeElement, mapOptions); // display the map to the user

        // add map markers to the map
        for (let i = 0; i < journeyCount; i++) {
          var startPoint = new google.maps.Marker({ position: new google.maps.LatLng(journeys[i].startLat, journeys[i].startLong), title: "Start" });
          startPoint.setMap(this.gipmap);
        }
      }
    });
  }

}
