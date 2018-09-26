import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  data:string="";
  constructor(public navCtrl: NavController,private geoLocation: Geolocation) {

  }

  locate(){
      this.geoLocation.getCurrentPosition().then((res)=>{
        this.data='Lat : '+res.coords.latitude+'<br>'+'Lng'+res.coords.longitude
      }).catch((err)=>{
          console.log("err");
      })
  }

}