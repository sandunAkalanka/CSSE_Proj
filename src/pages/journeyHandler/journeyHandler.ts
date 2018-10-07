import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { MapPage } from '../map/map';
import { AlertController } from 'ionic-angular';
import { PayHome } from '../payhome/payhome';
@Component({
  selector: 'page-journeyHandler',
  templateUrl: 'journeyHandler.html'
})
export class journeyHandler {
  public Username;
  public NIC;
  public accbalance=100;
  public startLoc='';
  public startLat:any;
  public startLong:any;
  public endLoc:any;
  public endLat:any;
  public endLong:any;
  public tickCount=1;
  public isStart:any;
  public result:any=[];
  public data:any=[];
  public routes:any=[];
  public total:any;
  public route:any;
  public busType="normalFare";
  public fare:any;
  public totfare:any;
  options:BarcodeScannerOptions;
  public text='';
  public strt_lat:any;
  public strt_lng:any;
  public end_lat:any;
  public end_lng:any;
  public startHaltNo=0;
  public endHaltNo=0;
  qrData=null;
  createdCode=null;
  scannedCode=null;
  bckendIp;

  //constructor
  constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner,private qrScanner:QRScanner, private http: Http,private alertCtrl: AlertController) {
    localStorage.setItem('userFName','Viraj Gunathilaka');
    this.Username=localStorage.getItem('userFName');
    this.bckendIp = localStorage.getItem('backendip'); // get ip of backend
    this.NIC=localStorage.getItem('userNIC');
  }

  //-----------Get balance by Minila---------------
  ionViewDidLoad(){
    var link = 'http://'+this.bckendIp+':3001/'+this.NIC;
    
    // this.http.get(link).subscribe(function (response) {
    //   console.log(response);
    //   this.accbalance=response['data'][0].Account;
    //   //cant get derectly amount that why
    //   localStorage.setItem('amount',this.bal);//accountbalance*
    // });
    this.http.get(link).pipe(
      map(res => res.json())
    ).subscribe(response => {
          this.accbalance=response['data'][0].Account;
          console.log(this.accbalance);
    });
  }
  addPayment(){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let postParams1={
      Username: this.Username,
      busRoute: this.route,
      start: this.startLoc,
      end: this.endLoc,
      amount: this.total
    }
    this.http.post("http://localhost:3001/payment/", postParams1, options)//get bal and get journeyhandle
        .subscribe(data => {
          console.log(data['_body']);
         }, error => {
          console.log(error);// Error getting the data
        });
        let postParams2={
          Deposit_Amount: this.accbalance
        }
        this.http.put("http://localhost:3001/customer/"+this.NIC, postParams2, options)//get bal and get journeyhandle
        .subscribe(data => {
          console.log(data['_body']);
         }, error => {
          console.log(error);// Error getting the data
        });
    
    }
    
    balance(){
      this.accbalance=this.accbalance-this.total;
    }
    //-----------Get balance by Minila---------------

  //Start Journey button click event
  startTour(){
    if(this.accbalance>=-50){
      //Scan function
      this.scanCode();
      this.getBusRoutes();
      this.isStart="true";
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Balance is not enough',
        subTitle: 'Please recharge before your next tour',
        buttons: ['Dismiss']
      });
      alert.present();
      this.navCtrl.push(PayHome);
    }
  }

  //Navigate to the map page
  mapPage(){
    if(this.isStart=="true"){
      this.navCtrl.push(MapPage,{
        strt_lat: this.strt_lat,
        strt_lng: this.strt_lng,
        end_lat: this.end_lat,
        end_lng: this.end_lng
      });
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

  ticketCount($value) {
    this.tickCount=$value;
  }

  getBus($value){
    this.busType=$value;
  }

  //End Journey button click event
  endTour(){
    
    this.scanCode();
    this.getBusTypeFare();
    this.getTotal();
    this.postData();
  }

  //Get the total amount. Sends the route and bus type as parameters. In order to get the total amount user has to start a tour.
  getTotal(){
    if(this.isStart=="true"){
      this.http.get('http://'+this.bckendIp+':3001/total/tot/'+this.route+"/"+this.fare+"/"+this.startHaltNo+"/"+this.end_lat+"/"+this.end_lng).pipe(
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

  //Get bus type fare. That means AC bus fare/Normal Bus fare/Long service bus fare
  getBusTypeFare(){
    if(this.isStart=="true"){
      this.http.get('http://'+this.bckendIp+':3001/total/route/'+this.busType).pipe(
          map(res => res.json())
      ).subscribe(response => {
        if(this.busType=='normalFare'){
          this.fare=response.data.normalFare;
        }
        else{
          this.fare=response.data.longFare;
        }
        console.log(this.fare);
      });
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
      Username: this.Username,
      busRoute: this.route,
      start: this.startLoc,
      startLat: this.strt_lat,
      startLong: this.strt_lng,
      end: this.endLoc,
      endLat: this.end_lat,
      endLong: this.end_lng,
      fare: this.total,
      date: "1996/09/09"
    }
    
    this.http.post("http://'+this.bckendIp+':3001/journey/", postParams, options)
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
         // Error getting the data
        console.log(error);
      });
  }

  //Get bus halts for given bus route
  getBusRoutes(){
    
    this.http.get('http://'+this.bckendIp+':3001/journey/'+this.route).pipe(
            map(res => res.json())
    ).subscribe(response => {
      console.log(response);
          this.routes=response.data;
          var i;
          var j;
          for(i=0;i<this.routes[0].haults.length;i++){
            if(this.strt_lat==this.routes[0].haults[i].latitude && this.strt_lng==this.routes[0].haults[i].longtitude){
              j=i+1;
              this.startLoc=this.routes[0].haults[i].busHault;
              this.end_lat=this.routes[0].endLat;
              this.end_lng=this.routes[0].endLong;
              console.log(this.startLoc);
            }
          }
          for(i=j;i<this.routes[0].haults.length;i++){
              this.text+=this.routes[0].haults[j].busHault+"/ ";
              this.startHaltNo++;
          }
          
    });
  }
  //End the bus journey route
  endBusRoute(){
    this.http.get('http://'+this.bckendIp+':3001/journey/'+this.route).pipe(
            map(res => res.json())
    ).subscribe(response => {
      this.routes=response.data;
      var i;
      for(i=0;i<this.routes[0].haults.length;i++){
        if(this.strt_lat==this.routes[0].haults.latitude && this.strt_lng==this.routes[0].haults.longtitude){
              var j;
              for(j=i;j<this.routes[0].haults.length;i++){
                this.endLoc=this.routes[0].end;
                this.endHaltNo++;
              }
        }
      }
    });
  }

  //Scan the qr code
  scanCode(){

    // this.qrScanner.prepare()
    // .then((status: QRScannerStatus) => {
    //   if (status.authorized) {
    //     // camera permission was granted


    //     // start scanning
    //     let scanSub = this.qrScanner.scan().subscribe((text: string) => {
    //       console.log('Scanned something', text);

    //       this.qrScanner.hide(); // hide camera preview
    //       scanSub.unsubscribe(); // stop scanning
    //     });

    //   } else if (status.denied) {
    //     // camera permission was permanently denied
    //     // you must use QRScanner.openSettings() method to guide the user to the settings page
    //     // then they can grant the permission from there
    //   } else {
    //     // permission was denied, but not permanently. You can ask for permission again at a later time.
    //   }
    // })
    // .catch((e: any) => console.log('Error is', e));
    this.strt_lat=45;
    this.strt_lng=78;
    this.end_lat=23;
    this.end_lng=45;
    // this.endLoc="Kollupitiya";
    this.route="177 Kaduwela-Kollupitiya";
  }

}