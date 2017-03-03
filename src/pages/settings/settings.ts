import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  name: any;
  surname: any;
  phone: any;
  allow_calls: any;
  allow_sms: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.storage.ready().then(() => {
      this.getSettings();
    });
  }

  saveSettings(){
    this.storage.set('name', this.name);
    this.storage.set('surname', this.surname);
    this.storage.set('phone', this.phone);
    this.storage.set('allow_calls', this.allow_calls);
    this.storage.set('allow_sms', this.allow_sms);
  }

  getSettings(){
    this.storage.get('name').then((val) => {
      this.name = val;
   });
   this.storage.get('surname').then((val) => {
      this.surname = val;
   });
   this.storage.get('phone').then((val) => {
      this.phone = val;
   });
   this.storage.get('allow_calls').then((val) => {
      this.allow_calls = val;
   });
   this.storage.get('allow_sms').then((val) => {
      this.allow_sms = val;
   });

  }
  cleanAll(){
    this.storage.clear();
  }
  goToHome() {
    this.navCtrl.push(HomePage);
  }
}
