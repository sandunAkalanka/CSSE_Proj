import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the CardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {
  getpin;
  accamount;
  bal;
  amount;
  savepin;
  bckendIp;
  userNIC;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.bckendIp = localStorage.getItem('backendip'); // get ip of backend
    this.userNIC = localStorage.getItem('userNIC'); // get user nic from sessions
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
    var link = 'http://'+this.bckendIp+':3001/customer/'+this.userNIC;
    this.http.get(link).subscribe(function (response) {
      console.log(response);
      this.bal = response['data'][0].Account;
      // console.log(this.bal);
      localStorage.setItem('amount', this.bal);
    });
  }

  fromPIN() {
    var link = 'http://'+this.bckendIp+':5003/cardPayment/' + document.getElementById("phone").nodeValue;
    ////console.log("workkkkkkkkkkkkkkkkkkkkkkk");
    this.http.get(link).subscribe(function (response) {
      console.log(response);
      this.savepin = response['data'];
      // alert("PIN Numner Is :  "+response.data.PIN);

      ///obj.pin=response.data.PIN;
      document.getElementById("confirm");
      document.getElementById("pin");
      alert(this.savepin);
      localStorage.setItem("pin", this.savepin);
    });
  }
  confirmPayment() {
    // conpin:this.fromPIN();
    console.log("generate pin " + localStorage.getItem("pin"));
    console.log(this.getpin);
    if (localStorage.getItem("pin") === this.getpin) {///get pin and convert decimal
      //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
      console.log(this.accamount);
      console.log(parseInt(localStorage.getItem('amount'), 10) + parseInt(this.accamount));
      // console.log(this.bal);
      var link = 'http://'+this.bckendIp+':3001/customer/'+this.userNIC;
      this.http.put(link, {

        Account: (parseInt(localStorage.getItem('amount'), 10) + parseInt(this.accamount))

      }).subscribe(data => {
        alert('Payment accepted !');
      })
      localStorage.removeItem("pin");
    } else {
      console.log("Incorrect PIN entered !");
    }
  }

}
