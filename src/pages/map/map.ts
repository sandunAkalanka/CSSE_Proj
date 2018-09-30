import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Subscription } from 'rxjs/Subscription';
import { Storage } from '@ionic/storage';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') MapElement: ElementRef;
  map: any;
  data:string="";
  currentMapTrack = null;

  isTracking=false;
  trackedRoute=[];
  previousRoutes=[]; 
  positionSubscription: Subscription;

  constructor(public navCtrl: NavController,private geoLocation: Geolocation,private plt:Platform,private storage:Storage,private nativeGeocoder: NativeGeocoder) {

  }

  ionViewDidLoad(){
    this.plt.ready().then(()=>{
      this.loadRoutes();
    })

    // let mapOptons={
    //   zoom: -13,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP,
    //   maptypeControl: false,
    //   streetViewControl: false,
    //   fullscreenControl: false
    // };

    // this.map=new google.maps.Map(this.MapElement.nativeElement, mapOptons);

    // this.geoLocation.getCurrentPosition().then(pos=>{
    //   let latLng=new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    //   this.map.setCenter(latLng);
    //   this.map.setZoom(15);
    // })
  }

  loadRoutes(){
    // this.storage.get('routes').then(data=>{
    //   if(data){
    //     this.previousRoutes=data;
    //   }
    // })
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(52.5072095, 13.1452818, options)
      .then((result: NativeGeocoderReverseResult[]) => console.log(JSON.stringify(result[0])))
      .catch((error: any) => console.log(error));

    this.nativeGeocoder.forwardGeocode('Berlin', options)
      .then((coordinates: NativeGeocoderForwardResult[]) => console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude))
      .catch((error: any) => console.log(error));
  }

  // locate(){
  //     this.geoLocation.getCurrentPosition().then((res)=>{
  //       this.data='Lat : '+res.coords.latitude+'<br>'+'Lng'+res.coords.longitude
  //     }).catch((err)=>{
  //         console.log("err");
  //     })
  // }

}