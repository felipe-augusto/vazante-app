import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Http, Headers} from '@angular/http';

import { Autocomplete } from '../../components/autocomplete/autocomplete'

declare var google;

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('from') from: ElementRef;
  map: any; // created map
  toSelection;
  fromSelection;
  starts;
  address;
  departure;
  // draw rout
  directionsService;
  directionsDisplay;
  directionsRenderer;
  lastRoute;
  // 
  sentLocation;

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private http: Http) {
    this.address = {
      place: ''
    };

    this.starts = [
      {
        name: "Saída Rockfeller",
        coords: '-23.643108, -46.529357'
      }
    ]

    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
  }

  ionViewDidLoad() {
    this.loadMap()
  }

  loadMap() {
    var start = new google.maps.LatLng(-23.644359,-46.528339)
    var myOptions = {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 16,
      center: start
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, myOptions)
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.from.nativeElement)
  }

  showAddressModal () {
    let modal = this.modalCtrl.create(Autocomplete);
    let me = this;
    modal.onDidDismiss(data => {
      this.address.place = data;
      if (this.fromSelection && this.fromSelection.name) {
        this.render()
      }
    });
    modal.present();
  }

  render() {
    this.directionsService.route({ 
      origin: this.fromSelection.coords, 
      destination: this.address.place, 
      travelMode: google.maps.DirectionsTravelMode.WALKING
    }, function(result) {
      this.lastRoute = result

      this.directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
        map: this.map,
        directions: result
      });

      this.directionsRenderer.addListener('directions_changed', function() {
        this.lastRoute = this.directionsRenderer.getDirections();
      }.bind(this))
    }.bind(this));
  }

  match() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:9000/api/matcher', this.sentLocation, { headers: headers }).subscribe(
      (res) => console.log(res.json()),
      (e) => console.log(e)
    )
  }

  go() {
    const coords = this.lastRoute.routes[0].legs[0].steps.reduce(function(arr, step) {
      step.path.map(function (path) {
        arr.push({
          lat: path.lat(),
          lng: path.lng()
        })
      })

      return arr
    }, [])

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const payload = {
      user_id: "my user id",
      coords: coords,
      time: new Date().getTime().toString()
    }

    this.http.post('http://localhost:9000/api/location', payload, { headers: headers }).subscribe(
      (res) => this.sentLocation = res.json(),
      (e) => console.log(e)
    )
  }
}