import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';
import { SignUpPage } from '../SignUp/SignUp';
import { ResetPwdPage } from '../ResetPwd/ResetPwd';

@Component({
  selector: 'page-SignIn',
  templateUrl: 'SignIn.html'
})
export class SignInPage {

  bckendIp;
  loginUName;
  loginPwd;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public httpClient: HttpClient) {
    //this.Username=this.navParams.get('Username');
    this.bckendIp = localStorage.getItem('backendip');
  }

  // buttonClicked(){

  //   this.navCtrl.push(SignUpPage);

  // }

  showConfirm() {
    if (this.loginUName != null && this.loginPwd != null) {
      this.httpClient.get('http://' + this.bckendIp + ':3001/customer/login/' + this.loginUName).subscribe(data => {
        // console.log(data);
        if (data['data'].length != 0 && data['data'][0].Password == this.loginPwd) {
          localStorage.setItem("userNIC", data['data'][0].NIC_Passport_No);
          localStorage.setItem("userFName", data['data'][0].First_Name);
          localStorage.setItem("userLName", data['data'][0].Last_Name);
          alert('Welcome ' + data['data'][0].First_Name + ' !');
          this.navCtrl.setRoot(HomePage)
        } else {
          alert("Incorrect credentials !");
        }
      });
    }else{
      alert("Please enter your username and password !");
    }
  }

  forgotPwd() {
    this.navCtrl.push(ResetPwdPage);
  }

  Register() {
    this.navCtrl.push(SignUpPage);
  }

}