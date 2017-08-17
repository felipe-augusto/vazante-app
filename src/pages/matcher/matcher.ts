import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers} from '@angular/http';

declare var google;

@Component({
  selector: 'page-matcher',
  templateUrl: 'matcher.html'
})
export class MatcherPage {
  location_id: any;
  data: any;

  convertTime(time) {
    var utcSeconds = parseInt(time);
    var d = new Date(0);
    d.setUTCSeconds(utcSeconds);
    if (d.getMinutes() < 10) {
      return d.getHours() + ":0" + d.getMinutes()
    }
    return d.getHours() + ":" + d.getMinutes()
  }

  parse(i) {
    return parseInt(i)
  }

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private http: Http,
    public loadingCtrl: LoadingController) {
    this.location_id = navParams.get('location_id')
    let payload = { location_id : this.location_id }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json')

    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    loading.present();

    this.http.post('https://vazante.herokuapp.com/api/matcher', payload, { headers: headers }).subscribe(
      (res) => {
        this.data = res.json()
        loading.dismiss();
      },
      (e) => console.log(e)
    )
  }
}