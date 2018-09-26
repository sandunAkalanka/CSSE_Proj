import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { MapPage } from '../map/map';

@Component({
  selector: 'page-journey',
  templateUrl: 'journey.html'
})
export class JourneyPage {

  options:BarcodeScannerOptions;
  public routes:any=[];
  public fare:any=[];
  public totfare:any=[];
  qrData=null;
  createdCode=null;
  scannedCode=null;

  constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner, private http: Http) {
    
  }

  getTotal(){
    this.http.get('http://localhost:3001/total/tot/').pipe(
            map(res => res.json())
    ).subscribe(response => {
           this.routes=response;
    });
  }

  createCode(){
    // this.createdCode=this.qrData;
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.qrData).then((data)=>{
      this.createdCode=data;
    },(err)=>{
      console.log(err);
    })
  }

  getBusRoutes(){

    this.http.get('http://localhost:3001/routes/').pipe(
            map(res => res.json())
    ).subscribe(response => {
           this.routes=response;
    });
  }

  scanCode(){
    // this.barcodeScanner.scan().then(barcodeData=>{
    //   this.scannedCode=barcodeData.text;
    // })
    this.barcodeScanner.scan(this.options).then((data)=>{
      this.createdCode=data;
    },(err)=>{
      console.log("Error :",err);
    })
  }

  mapPage(){
    this.navCtrl.push(MapPage);
  }

}