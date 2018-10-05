import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TaskProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskProvider {
apiBaseurl: string='';
  constructor(public http: HttpClient) {
    this.apiBaseurl='http://localhost:3000/explorer/api';
  }
gettask(id){
  return new Promise(resovel =>{
    this.http.get(this.apiBaseurl + 'ticket/'+ id).subscribe(data =>{
      resovel(data);
    },err=>{
      console.log(err);
    })
  })
}
addtask(task){
  return new Promise(resovel =>{
    this.http.post(this.apiBaseurl + 'ticket',task).subscribe(data =>{
      resovel(data);
    },err=>{
      console.log(err);
    })
  })
}
updatetask(task,id){
  return new Promise(resovel =>{
    this.http.put(this.apiBaseurl + 'ticket/'+ id,task).subscribe(data =>{
      resovel(data);
    },err=>{
      console.log(err);
    })
  })
}
}
