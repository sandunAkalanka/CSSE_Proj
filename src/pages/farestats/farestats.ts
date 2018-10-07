import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the FarestatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-farestats',
  templateUrl: 'farestats.html',
})
export class FarestatsPage {

  bckendIp;
  userNIC;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
    this.bckendIp = localStorage.getItem('backendip'); // ip of the backend
    this.userNIC = localStorage.getItem('userNIC'); // user's nic
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FarestatsPage');
    this.getData();
  }

  getData() {
    this.httpClient.get('http://' + this.bckendIp + ':3001/journeyhistory/' + this.userNIC).subscribe(data => {
      // console.log(data['data']);
      var journeyCount = Object.keys(data['data']).length;
      var journeys = data['data'];

      // check if any journey details exists
      if (journeyCount > 0) {
        var fareArr = [];
        var tot = 0;
        for (let i = 0; i < journeyCount; i++) {
          // fareArr.push([i,journeys[i].fare]);
          fareArr[i] = { x: i, y: journeys[i].fare };
          tot += journeys[i].fare;
        }
        document.getElementById('fstxt').innerHTML = "Total fares spent Rs. " + tot;
        document.getElementById('fstxt2').innerHTML = "Average fare Rs. " + (tot/journeyCount);
        this.drawChart(fareArr);
      }
    });
  }

  drawChart(fareArr) {
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light1", // "light1", "light2", "dark1", "dark2"
      title: {
        text: "Journey Fares"
      },
      data: [{
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: fareArr
      }]
    });
    chart.render();
  }

}
