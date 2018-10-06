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

  bckendIp;
  cpspwd;
  cpscpwd;
  userNIC;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.bckendIp = localStorage.getItem('backendip'); // get the ip address of the backend
    this.userNIC = localStorage.getItem('userNIC'); // get the user's nic from sessions
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ChangepassPage');
  }

  changePass() {
    // if ('p1->' + this.cpspwd === this.cpscpwd)
    var p1 = this.cpspwd;
    var p2 = this.cpscpwd;
    // check if the passwords entered match
    if (p1 === p2)
      this.sendPwdToDB();
    else {
      // message stating the passwords do not match
      swal({
        type: 'error',
        title: 'Oops !',
        text: 'Your Passwords do not match !'
      });
    }
  }

  sendPwdToDB() {
    // get confirmation from the user before changing the password
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
        // executed when user confirms the pwd change
        this.http.put("http://"+this.bckendIp+":3001/user/"+this.userNIC, {
          "Password": this.cpspwd
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
