// import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  token: string;
  constructor(public navCtrl: NavController,private storage: Storage ) {

    this.storage.get('token_autenticacao')
    .then(
      data => this.token = data.token,
      erro => this.token='<sem token>'
    );

  }

}
