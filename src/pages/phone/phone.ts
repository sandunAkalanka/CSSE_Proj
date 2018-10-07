import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskProvider } from '../../providers/task/task';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the PhonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phone',
  templateUrl: 'phone.html',
})
export class PhonePage {
  Taskid;
  task: any = {};
  ticketname;
  Account;
  amount;
  getpin;
  savepin;
  bal;
  accamount;
  bckendIp;
  userNIC;

  constructor(public navCtrl: NavController, public navParams: NavParams, public taskprovider: TaskProvider, public http: HttpClient) {
    this.Taskid = this.navParams.get('id');
    this.bckendIp = localStorage.getItem('backendip'); // get ip of backend
    this.userNIC = localStorage.getItem('userNIC'); // get user nic from sessions
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhonePage');
    var link = 'http://'+this.bckendIp+':3001/customer/'+this.userNIC;
    this.http.get(link).subscribe(function (response) {
      console.log(response);
      this.bal=response['data'][0].Account;
      localStorage.setItem('amount',this.bal);
    });
  }

  gettask(id) {
    this.taskprovider.gettask(id).then(data => {
      console.log(data);
      this.task = data;


    })
  }
  updatetask(id) {
    let task = {
      ticketname: this.ticketname,
      Account: function (amount) {
        if (this.Account > amount) {
          this.Account = this.Account - amount
        }
        else {
          alert("You must rechage your account");
        }
      }
    }
    this.taskprovider.updatetask(this.Taskid, this.task).then(data => {
      console.log(data);
      this.task = data;
    })
  }


  fromPIN() {
    var link = 'http://'+this.bckendIp+':5002/mobilePayment/' + document.getElementById("phone").nodeValue;
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
      console.log(parseInt(localStorage.getItem('amount'),10) + parseInt(this.accamount));
      // console.log(this.bal);
      var link = 'http://'+this.bckendIp+':3001/customer/'+this.userNIC ;
      this.http.put(link,{
      
        Account:(parseInt(localStorage.getItem('amount'),10) + parseInt(this.accamount))

      }).subscribe(data =>{
        alert('Payment accepted !');
      })
      localStorage.removeItem("pin");
    } else {
      console.log("Incorrect PIN entered !");
    }
  }
}
