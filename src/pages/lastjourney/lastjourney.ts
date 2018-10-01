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

  constructor(public navCtrl: NavController, public httpClient: HttpClient) { 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LastjourneyPage');
    this.initMap();
  }

  initMap(){
    
    // let coords = new google.maps.LatLng(25,80);
    // let mapOptions: google.maps.MapOptions = {
    //   center: coords,
    //   zoom: 11,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // }

    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

    // let marker: google.maps.Marker = new google.maps.Marker({
    //   map: this.map,
    //   position: coords
    // })

  }

}
