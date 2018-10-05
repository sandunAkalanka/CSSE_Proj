import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { SignInPage } from '../SignIn/SignIn';


@Component({
  selector: 'page-SignUp',
  templateUrl: 'SignUp.html',
})

export class SignUpPage {

  bckendIp;
  fName;
  lName;
  nic;
  dob;
  citizenship;
  amount;
  username;
  email;
  pwd1;
  pwd2;
  secQues;
  secAns;
  address;
  mobile;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http, public Http: HttpClient) {
    this.bckendIp = localStorage.getItem('backendip');
  }

  showConfirm() {
    if (this.pwd1 == this.pwd2) {
      this.registerUser();
    } else {
      alert('Passwords do not match !');
    }
  }

  registerUser() {
    let postParams = {
      "First_Name": this.fName,
      "Last_Name": this.lName,
      "NIC_Passport_No": this.nic,
      "DateOfBirth": this.dob,
      "citizenship": this.citizenship,
      "Deposit_Amount": this.amount,
      "Username": this.username,
      "Password": this.pwd1,
      "Security_Question": this.secQues,
      "Security_Answer": this.secAns,
      "Email_Address": this.email,
      "Address": this.address,
      "Mobile": this.mobile
    }

    this.Http.post("http://" + this.bckendIp + ":3001/customer/", postParams)
      .subscribe(data => {
        // console.log(data['_body']);
        alert('Account was registered successfully !');
        this.navCtrl.push(SignInPage);
      }, error => {
        console.log(error);// Error getting the data
        alert('An error occured while creating your account !');
      });
  }

  login() {
    this.navCtrl.push(SignInPage);
  }

}
