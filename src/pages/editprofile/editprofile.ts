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
  userNIC;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public http: Http) {
    this.bckendIp = localStorage.getItem('backendip');
    this.userNIC = localStorage.getItem('userNIC');
    this.userDetails = this.httpClient.get('http://' + this.bckendIp + ':3001/user/'+this.userNIC);
    this.userDetails.subscribe(data => {
      // console.log('my data: ', data);
      document.getElementById('efullname').innerHTML = data.data.First_Name + ' ' + data.data.Last_Name;
      this.efname = data.data.First_Name;
      this.elname = data.data.Last_Name;
      this.enic = data.data.NIC_Passport_No;
      this.ephone = data.data.Mobile;
      this.eemail = data.data.Email_Address;
      this.edob = data.data.DateOfBirth;
      this.ecitizen = data.data.citizenship;
      this.esecq = data.data.Security_Question;
      this.esecans = data.data.Security_Answer;
      this.eaddress = data.data.Address;
      // this.eamount = data.data.amount;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  saveDetails() {
    let postParams = {
      "First_Name": this.efname,
      "Last_Name": this.elname,
      "NIC_Passport_No": this.enic,
      "DateOfBirth": this.edob,
      "citizenship": this.ecitizen,
      "Security_Question": this.esecq,
      "Security_Answer": this.esecans,
      "Email_Address": this.eemail,
      "Address": this.eaddress,
      "Mobile": this.ephone,
    }

    this.http.put("http://" + this.bckendIp + ":3001/user/"+this.userNIC, postParams)
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
