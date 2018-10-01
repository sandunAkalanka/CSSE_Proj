import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import swal from 'sweetalert2';

/**
 * Generated class for the ChangepassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepass',
  templateUrl: 'changepass.html',
})
export class ChangepassPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepassPage');
  }

  changePass() {
    // if ('p1->' + this.cpspwd === this.cpscpwd)
    var p1 = this.cpspwd;
    var p2 = this.cpscpwd;
    if (p1 === p2)
      this.sendPwdToDB();
    else {
      swal({
        type: 'error',
        title: 'Oops !',
        text: 'Your Passwords do not match !'
      });
    }
  }

  sendPwdToDB() {
    swal({
      title: 'Are you sure?',
      text: "You want to change the password !",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.http.put("http://localhost:3001/user/952033310V", {
          "password": this.cpspwd
        }).subscribe(data => {
          // console.log(data['_body']);
          swal({
            type: 'success',
            title: 'Success',
            text: 'Your Password was changed !'
          });
          this.navCtrl.pop();
        }, error => {
          console.log(error);// Error getting the data
        });
      }
    })
  }

}
