import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { MapPage } from '../map/map';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-journeyHandler',
  templateUrl: 'journeyHandler.html'
})
export class journeyHandler {

  options:BarcodeScannerOptions;
  public tickCount=1;
  public isStart:any;
  public result:any=[];
  public data:any=[];
  public routes:any=[];
  public total:any;
  public route="177";
  public busType="normalFare";
  public fare:any=[];
  public totfare:any=[];
  qrData=null;
  createdCode=null;
  scannedCode=null;

  constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner, private http: Http,private qrScanner: QRScanner,private alertCtrl: AlertController) {
    
  }

  ticketCount($value) {
    this.tickCount=$value;
  }

  getBus($value){
    this.busType=$value;
  }

  //Get the total amount. Sends the route and bus type as parameters. In order to get the total amount user has to start a tour.
  getTotal(){
    if(this.isStart=="true"){
      this.http.get('http://localhost:3001/total/tot/'+this.route+"/"+this.busType).pipe(
              map(res => res.json())
      ).subscribe(response => {
            this.total=response.data*this.tickCount;
      });
      console.log(this.total);
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Not started a journey',
        subTitle: 'Start a journey',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  endTour(){
    
  }

  //Create a qr code
  createCode(){
    // this.createdCode=this.qrData;
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.qrData).then((data)=>{
      this.createdCode=data;
    },(err)=>{
      console.log(err);
    })
  }

  //Insert tour details to the system
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
    
    this.http.post("http://localhost:3001/journey/", postParams, options)
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);// Error getting the data
      });
  }

  //Get bus halts for given bus route
  getBusRoutes(){
    this.isStart="true";
    var routNo="177";
    this.http.get('http://localhost:3001/journey/'+routNo).pipe(
            map(res => res.json())
    ).subscribe(response => {
           this.routes=response.data;
          console.log(this.routes);
    });
  }

  //Scan the qr code
  scanCode(){
    // this.barcodeScanner.scan().then(barcodeData=>{
    //   this.scannedCode=barcodeData.text;
    // })
    // this.barcodeScanner.scan(this.options).then((data)=>{
    //   this.createdCode=data;
    // },(err)=>{
    //   console.log("Error :",err);
    // })

    this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted


       // start scanning
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);

         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
       });

     } else if (status.denied) {
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));
  }

  //Navigate to the map page
  mapPage(){
    if(this.isStart=="true"){
      this.navCtrl.push(MapPage);
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Not started a journey',
        subTitle: 'Start a journey',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

}