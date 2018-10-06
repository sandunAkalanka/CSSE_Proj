import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController,Platform,NavParams  } from 'ionic-angular';
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

  @ViewChild('map') MapElement;
  map: any;
  data:string="";
  currentMapTrack = null;

  isTracking=false;
  trackedRoute=[];
  previousRoutes=[]; 
  positionSubscription: Subscription;

    end_lat:Number;
    end_lng:Number;
    strt_lat:Number;
    strt_lng:Number;

  constructor(public navCtrl: NavController,public navParams: NavParams,private geoLocation: Geolocation,private plt:Platform,private nativeGeocoder: NativeGeocoder) {
    this.strt_lat = navParams.get('strt_lat');
    this.strt_lng = navParams.get('strt_lng');
    this.end_lat = navParams.get('end_lat');
    this.end_lng = navParams.get('end_lng');
  }

  ionViewDidLoad(){
    this.plt.ready().then(()=>{
      this.loadMap();
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

  // loadRoutes(){
  //   // this.storage.get('routes').then(data=>{
  //   //   if(data){
  //   //     this.previousRoutes=data;
  //   //   }
  //   // })
  //   let options: NativeGeocoderOptions = {
  //     useLocale: true,
  //     maxResults: 5
  //   };
  //   this.nativeGeocoder.reverseGeocode(52.5072095, 13.1452818, options)
  //     .then((result: NativeGeocoderReverseResult[]) => console.log(JSON.stringify(result[0])))
  //     .catch((error: any) => console.log(error));

  //   this.nativeGeocoder.forwardGeocode('Berlin', options)
  //     .then((coordinates: NativeGeocoderForwardResult[]) => console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude))
  //     .catch((error: any) => console.log(error));
  // }

  //Load the map
  loadMap() {
    let latLng = new google.maps.LatLng(this.end_lat, this.end_lng);

    let mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.MapElement.nativeElement, mapOptions);

    var startPoint = new google.maps.Marker({ position: new google.maps.LatLng(this.strt_lat, this.strt_lng), title: "Start" });
    startPoint.setMap(this.map);
    var endPoint = new google.maps.Marker({ position: new google.maps.LatLng(this.end_lat, this.end_lng), title: "End" });
    endPoint.setMap(this.map);
    console.log("loadmap");
  }
}