import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, URLSearchParams } from '@angular/http'

import { SocialService } from '../../services/social-service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  FB_APP_ID: number = 109836813005590;
  constructor(public navCtrl: NavController,
    private socialService: SocialService,
    private http: Http) {
    // this.socialService.fbInit()
  }

  loginFacebook() {
    let headers = new Headers();

    let params = new URLSearchParams();
    params.append('access_token', 'EAABj5WA48xYBAIQENlyPrtWZACJSdiooKvIHQz7QqqlspkY0Gs1FqWkH5PFZBXfifivH4aJrgJbzgHCvoZAmrGmPuY8uWXlhn9g4FtwNsTjcZCr2StxwRx69odcPVvAAb7WpL6kjdUTu4pVgflzXSO8Cc5FDEh8ZBxfk2mipSV8O4L7IjZBaJ2xT17mKH9ipwZD');

    headers.append('Content-Type', 'application/json');

    let token = {'access_token' : 'EAABj5WA48xYBAIQENlyPrtWZACJSdiooKvIHQz7QqqlspkY0Gs1FqWkH5PFZBXfifivH4aJrgJbzgHCvoZAmrGmPuY8uWXlhn9g4FtwNsTjcZCr2StxwRx69odcPVvAAb7WpL6kjdUTu4pVgflzXSO8Cc5FDEh8ZBxfk2mipSV8O4L7IjZBaJ2xT17mKH9ipwZD'}

    this.http.post('http://localhost:9000/api/facebook', token, { headers: headers }).subscribe(
      (res) => console.log(res.json()),
      (e) => console.log(e)
    )
  }
}
