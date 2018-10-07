import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import { PhonePage } from '../phone/phone';
import{ CardPage } from '../card/card';
// import { TaskProvider } from '../../providers/task/task';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class PayHomePage {
Taskid;
Task;
  constructor(public navCtrl: NavController, public navParams:NavParams) {
    this.Taskid=this.navParams.get('id');
  }
  btnClicked(){
   // alert("test123");
    this.navCtrl.push(PhonePage,{id:this.Taskid});
  }
  btnClickcard(){
    this.navCtrl.push(CardPage);
  }
  update(){

  }
}
