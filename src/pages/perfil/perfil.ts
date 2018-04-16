import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PaginaBase } from '../../infraestrutura/PaginaBase';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage extends PaginaBase{

  imagemBase64:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera,
    public loadingCtrl: LoadingController, public toasCtrl: ToastController, public alertCtrl: AlertController) {
      super({ alertCtrl: alertCtrl, loadingCtrl: loadingCtrl, toastCtrl: toasCtrl });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  tirarFoto(): void {
    this.camera.getPicture({
      destinationType:  this.camera.DestinationType.DATA_URL,
      targetWidth:1000,
      targetHeight:1000
    }).then(
      (imagem)=>{
        this.imagemBase64 ="data:image/jpeg;base64",+imagem
      }
    );
  }
}
