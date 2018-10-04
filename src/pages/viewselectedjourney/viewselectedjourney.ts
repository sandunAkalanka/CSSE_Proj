import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewselectedjourneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewselectedjourney',
  templateUrl: 'viewselectedjourney.html',
})
export class ViewselectedjourneyPage {

  @ViewChild("selmap") mapElement;
  selmap: any;
  strt_lat;
  strt_lng;
  end_lat;
  end_lng;
  selectedJourneyDet;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedJourneyDet = navParams.get("selJourneyObj");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewselectedjourneyPage');
    this.getDetails();
  }

  getDetails() {
    var det = this.selectedJourneyDet;
    document.getElementById('vsjdate').innerHTML = det.date;
    document.getElementById('vsjbsroute').innerHTML = det.busRoute;
    document.getElementById('vsjstrt').innerHTML = det.start;
    document.getElementById('vsjend').innerHTML = det.end;
    document.getElementById('vsjfare').innerHTML = det.fare;
    this.strt_lat = det.startLat;
    this.strt_lng = det.startLong;
    this.end_lat = det.endLat;
    this.end_lng = det.endLong;
    this.loadMap();
  }

  loadMap() {

    let latLng = new google.maps.LatLng(this.end_lat, this.end_lng);

    let mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.selmap = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    var startPoint = new google.maps.Marker({ position: new google.maps.LatLng(this.strt_lat, this.strt_lng), title: "Start" });
    startPoint.setMap(this.selmap);
    var endPoint = new google.maps.Marker({ position: new google.maps.LatLng(this.end_lat, this.end_lng), title: "End" });
    endPoint.setMap(this.selmap);

  }

}
