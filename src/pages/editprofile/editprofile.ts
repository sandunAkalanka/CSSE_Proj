import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import swal from 'sweetalert2';
// import { HttpClient } from '@angular/http';

/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
  userDetails: Observable<any>;
  bckendIp;
  efname;
  elname;
  enic;
  ephone;
  eemail;
  edob;
  ecitizen;
  esecq;
  esecans;
  eaddress;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public http: Http) {
    this.bckendIp=localStorage.getItem('backendip');
    this.userDetails = this.httpClient.get('http://'+this.bckendIp+':3001/user/952033310V');
    this.userDetails.subscribe(data => {
      // console.log('my data: ', data.data[0]);
      document.getElementById('efullname').innerHTML = data.data[0].fname + ' ' + data.data[0].lname;
      this.efname = data.data[0].fname;
      this.elname = data.data[0].lname;
      this.enic = data.data[0].nic;
      this.ephone = data.data[0].phone;
      this.eemail = data.data[0].email;
      // this.edob = data.data[0].email;
      this.edob = '1995-07-21';
      this.ecitizen = data.data[0].email;
      this.esecq = data.data[0].email;
      this.esecans = data.data[0].email;
      this.eaddress = data.data[0].email;
      // this.eamount = data.data[0].amount;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  saveDetails() {
    let postParams = {
      "fname": this.efname,
      "lname": this.elname,
      "nic": this.enic,
      "phone": this.ephone,
      "email": this.eemail
    }

    this.http.put("http://"+this.bckendIp+":3001/user/952033310V", postParams)
      .subscribe(data => {
        // console.log(data['_body']);
        swal({
          type: 'success',
          title: 'Success',
          text: 'Your changes were saved !'
        });
      }, error => {
        console.log(error);// Error getting the data
      });
    this.navCtrl.pop();
  }

}
