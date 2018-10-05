import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SignInPage } from '../SignIn/SignIn';

@Component({
  selector: 'page-ResetPwd',
  templateUrl: 'ResetPwd.html'
})
export class ResetPwdPage {

  bckendIp;
  rstEmail;
  correctAnswer;
  usrNic;
  rstAns;
  rstPwd;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public Http: HttpClient) {
    // this.Email=this.navParams.get('Email');
    this.bckendIp = localStorage.getItem('backendip');
  }

  // showConfirm() {
  //   const confirm = this.alertCtrl.create({
  //     message: 'Successfully Reset the password',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'OK',
  //         handler: () => {
  //           console.log('OK');
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }

  sendmail() {
    this.Http.get('http://' + this.bckendIp + ':3001/customer/resetpwd/' + this.rstEmail).subscribe(data => {
      // console.log(data);
      if (data['data'].length != 0) {
        document.getElementById('secqst').innerHTML = data['data'][0].Security_Question;
        this.correctAnswer = data['data'][0].Security_Answer;
        this.usrNic = data['data'][0].NIC_Passport_No;
      } else {
        alert("Email not found !");
      }
    });
    // document.getElementById('secques').style.display = "inline";
    // document.getElementById('emailfield').style.display = "none";
  }

  answered() {
    if (this.rstAns === this.correctAnswer) {
      // alert('correct');
    } else {
      alert('Incorrect Password !');
    }
    // document.getElementById('passfields').style.display = "inline";
    // document.getElementById('secques').style.display = "none";
  }

  changepass() {
    this.Http.put("http://" + this.bckendIp + ":3001/customer/"+this.usrNic, {
      "Password":this.rstPwd
    })
      .subscribe(data => {
        // console.log(data['_body']);
        alert('Password changed successfully !');
        this.navCtrl.push(SignInPage);
      }, error => {
        console.log(error);// Error getting the data
        alert('An error occured while changing your password !');
      });
  }

}


