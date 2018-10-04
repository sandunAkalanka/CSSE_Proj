import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
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

  @ViewChild("map") mapElement;
  map: any;

  bckendIp;
  strt_lat;
  strt_lng;
  end_lat;
  end_lng;
  constructor(public navCtrl: NavController, public httpClient: HttpClient) {
    this.bckendIp = localStorage.getItem('backendip');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LastjourneyPage');
    this.getDetails();
  }

  getDetails() {
    this.httpClient.get('http://' + this.bckendIp + ':3001/journeyhistory/last/952033310V').subscribe(data => {
      // console.log(data);
      document.getElementById('uljdate').innerHTML = data['data'].date;
      document.getElementById('uljbsroute').innerHTML = data['data'].busRoute;
      document.getElementById('uljstrt').innerHTML = data['data'].start;
      document.getElementById('uljend').innerHTML = data['data'].end;
      document.getElementById('uljfare').innerHTML = data['data'].fare;
      this.strt_lat = data['data'].startLat;
      this.strt_lng = data['data'].startLong;
      this.end_lat = data['data'].endLat;
      this.end_lng = data['data'].endLong;
      this.loadMap();
    });
  }

  // <ion-label id='uljbsroute'>Bus Route</ion-label>
  // <ion-label id='uljstrt'>Start</ion-label>
  // <ion-label id='uljend'>End</ion-label>
  // <ion-label id='uljfare'>Fare</ion-label>

  loadMap() {

    let latLng = new google.maps.LatLng(this.end_lat, this.end_lng);

    let mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    var startPoint = new google.maps.Marker({ position: new google.maps.LatLng(this.strt_lat, this.strt_lng), title: "Start" });
    startPoint.setMap(this.map);
    var endPoint = new google.maps.Marker({ position: new google.maps.LatLng(this.end_lat, this.end_lng), title: "End" });
    endPoint.setMap(this.map);
    
  }

}
