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
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileViewPage');
  }

  ionViewDidEnter() {
    this.loadUserDetails();
  }

  loadUserDetails(){
    this.httpClient.get('http://localhost:3001/user/952033310V').subscribe(data => {
      // console.log(data);
      document.getElementById('vusername').innerHTML = data['data'][0].fname + ' ' + data['data'][0].lname;
      document.getElementById('vnic').innerHTML = data['data'][0].nic;
      document.getElementById('vphone').innerHTML = data['data'][0].phone;
      document.getElementById('vemail').innerHTML = data['data'][0].email;
      document.getElementById('vamount').innerHTML = data['data'][0].amount;
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
