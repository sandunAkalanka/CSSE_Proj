import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the LastjourneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lastjourney',
  templateUrl: 'lastjourney.html',
})
export class LastjourneyPage {

  // map elements
  @ViewChild("map") mapElement;
  map: any;

  // variable to store session data
  bckendIp;
  userNIC;
  // variable to store location data
  strt_lat;
  strt_lng;
  end_lat;
  end_lng;

  constructor(public navCtrl: NavController, public httpClient: HttpClient) {
    this.bckendIp = localStorage.getItem('backendip'); // backend ip
    this.userNIC = localStorage.getItem('userNIC'); // get user's nic
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LastjourneyPage');
    this.getDetails();
  }

  getDetails() {
    // get the last journey's detail from the backend
    this.httpClient.get('http://' + this.bckendIp + ':3001/journeyhistory/last/' + this.userNIC).subscribe(data => {
      console.log(data);
      // check if a journey exist for the user
      if (data['data'] !== null) {
        // show data to the user
        document.getElementById('uljdate').innerHTML = data['data'].date;
        document.getElementById('uljbsroute').innerHTML = data['data'].busRoute;
        document.getElementById('uljstrt').innerHTML = data['data'].start;
        document.getElementById('uljend').innerHTML = data['data'].end;
        document.getElementById('uljfare').innerHTML = data['data'].fare;
        this.strt_lat = data['data'].startLat;
        this.strt_lng = data['data'].startLong;
        this.end_lat = data['data'].endLat;
        this.end_lng = data['data'].endLong;
        this.loadMap(); // draw the map based on the data from the backend
      } else {
        // display error message stating no journeys were found
        swal({
          type: 'error',
          title: 'Oops !',
          text: 'You do not have any journeys !'
        });
        this.navCtrl.pop(); // go to the previous page
      }
    });
  }

  loadMap() {
    // draw a map to display
    let latLng = new google.maps.LatLng(this.end_lat, this.end_lng);

    let mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions); // displays the generated map to the user

    // add marker to the map for the starting point
    var startPoint = new google.maps.Marker({ position: new google.maps.LatLng(this.strt_lat, this.strt_lng), title: "Start" });
    startPoint.setMap(this.map);

    // add marker to the map for the ending point
    var endPoint = new google.maps.Marker({ position: new google.maps.LatLng(this.end_lat, this.end_lng), title: "End" });
    endPoint.setMap(this.map);

  }

}
