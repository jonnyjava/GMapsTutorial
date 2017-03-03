import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { SMS } from 'ionic-native';
import { SettingsPage } from '../settings/settings';
import { Storage } from '@ionic/storage'

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('my_gmap') mapElement: ElementRef;
  map: any;
  number = '0034610347748';
  allow_calls: any;
  allow_sms: any;

  constructor(public navCtrl: NavController, public storage: Storage) {
    this.storage.ready().then(() => {
      this.getSettings();
    });
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){

    Geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();
    }, (err) => {
      console.log(err);
    });
  }

  addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  sendSMS(){
    var options={
      replaceLineBreaks: false,
      android: { intent: 'INTENT' }
    }
    SMS.send(this.number, 'Hello world!',options).then(()=>{
      alert("success");
    },()=>{
      alert("failed");
    });
  }

  goToSettings() {
    this.navCtrl.push(SettingsPage);
  }

  getSettings(){
    this.storage.get('allow_calls').then((val) => {
      this.allow_calls = val;
   });
   this.storage.get('allow_sms').then((val) => {
      this.allow_sms = val;
   });
  }
}
