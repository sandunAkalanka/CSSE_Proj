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

  ionViewLoad(){
   
    console.log("test1");
    console.log('ionViewLoad SignUpPage ');
    var link ='http://'+this.bckendIp+':3001/user/123';
    this.http.get(link).subscribe(function(response){
      console.log(response);
      //this.

    })
  }

  dupicate() {
    var link = 'http://' + this.bckendIp + ':3001/customer/login/' + this.username;
    this.Http.get(link).subscribe(function (response) {
      console.log(response);
      if ((response['data'].length) > 0) {
        return false;
      }
      else {
        return true;
      }
      //this.

    })
  }
  // showConfirm() {
  //   if (this.pwd1 == this.pwd2) {
  //     this.registerUser();
  //   } else {
  //     alert('Passwords do not match !');
  //   }
  // }

  showConfirm() {
    //if (this.dupicate()) {
      if (this.pwd1 == this.pwd2) {
        this.registerUser();
      } else {
        alert('Passwords do not match !');
      }
   /* }
    else{
      alert("duplicated customer!!!!!!!!!!!")
    }*/

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

  //   this.Http.post("http://" + this.bckendIp + ":3001/customer/", postParams)
  //     .subscribe(data => {
  //       // console.log(data['_body']);
  //       alert('Account was registered successfully !');
  //       this.navCtrl.push(SignInPage);
  //     }, error => {
  //       console.log(error);// Error getting the data
  //       alert('An error occured while creating your account !');
  //     });
  // }


  if(this.fName != null || this.lName != null ||this.nic != null || this.dob != null || this.citizenship != null || this.amount != null || this.username != null || this.pwd1 != null || this.secQues != null || this.secAns != null || this.address != null || this.mobile != null){
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
    else{
      alert('fileds are empty!!!!!!');  
    }
  }

  login() {
    this.navCtrl.push(SignInPage);
  }

}
