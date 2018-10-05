import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import { PhonePage } from '../phone/phone';
import { TaskProvider } from '../../providers/task/task';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
Taskid;
Task;
  constructor(public navCtrl: NavController, public navParams:NavParams,public taskprovider: TaskProvider ) {
    this.Taskid=this.navParams.get('id');
  }
  btnClicked(){
   // alert("test123");
    this.navCtrl.push(PhonePage,{id:this.Taskid});
  }

  
  update(){

  }
}
