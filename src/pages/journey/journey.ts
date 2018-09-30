import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { MapPage } from '../map/map';

@Component({
  selector: 'page-journey',
  templateUrl: 'journey.html'
})
export class JourneyPage {

  options:BarcodeScannerOptions;
  public result:any=[];
  public data:any=[];
  public routes:any=[];
  public fare:any=[];
  public totfare:any=[];
  qrData=null;
  createdCode=null;
  scannedCode=null;

  constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner, private http: Http) {
    
  }

  getTotal(){
    this.http.get('http://localhost:3001/total/').pipe(
            map(res => res.json())
    ).subscribe(response => {
           this.routes=response.data;
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

  postData(){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
 
    let postParams = {
      Username: "a",
      start: "aa",
      startLat: 12,
      startLong: 23,
      end: "ss",
      endLat: 45,
      endLong: 69,
      busRoute: "789",
      date: "2018/09/09",
      fare: 23
    }
    
    this.http.post("http://localhost:3001/total/", postParams, options)
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);// Error getting the data
      });
  }

  getBusRoutes(){
    var routNo="177";
    this.http.get('http://localhost:3001/journey/'+routNo).pipe(
            map(res => res.json())
    ).subscribe(response => {
           this.routes=response.data;
          console.log(this.routes);
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