import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EditprofilePage } from '../editprofile/editprofile';
import { ChangepassPage } from '../changepass/changepass';
import swal from 'sweetalert2';
import { Http } from '@angular/http';

/**
 * Generated class for the ProfileViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-view',
  templateUrl: 'profile-view.html',
})
export class ProfileViewPage {

  userDetails: Observable<any>;
  bckendIp;
  userNIC;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
    this.bckendIp = localStorage.getItem('backendip');
    this.userNIC = localStorage.getItem('userNIC');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileViewPage');
  }

  ionViewDidEnter() {
    this.loadUserDetails();
  }

  loadUserDetails(){
    this.httpClient.get('http://'+this.bckendIp+':3001/user/'+this.userNIC).subscribe(data => {
      // console.log(data);
      document.getElementById('vusername').innerHTML = data['data'].First_Name + ' ' + data['data'].Last_Name;
      document.getElementById('vnic').innerHTML = data['data'].NIC_Passport_No;
      document.getElementById('vphone').innerHTML = data['data'].Mobile;
      document.getElementById('vemail').innerHTML = data['data'].Email_Address;
      document.getElementById('vamount').innerHTML = data['data'].Deposit_Amount;
      document.getElementById('vdob').innerHTML = data['data'].DateOfBirth;
      document.getElementById('vciti').innerHTML = data['data'].citizenship;
      document.getElementById('vaddress').innerHTML = data['data'].Address;
      document.getElementById('vsecques').innerHTML = data['data'].Security_Question;
      document.getElementById('vsecans').innerHTML = data['data'].Security_Answer;
    });
  }

  editProfile() {
    this.navCtrl.push(EditprofilePage);
    // swal({
    //   type: 'success',
    //   title: 'Success',
    //   text: 'Your payment was accepted !'
    // });
  }

  changePass(){
    this.navCtrl.push(ChangepassPage);
  }

}
