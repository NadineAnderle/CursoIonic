import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from 'ionic-angular';

import { PaginaBase } from '../../infraestrutura/PaginaBase'
import { CursoIonicValidadores } from '../../validadores/CursoIonicValidadores';
import { LoginModel } from '../../models/loginModel';
import { HomePage } from '../home/home';
import { IAutenticacaoService } from '../../providers.interfaces/IAutenticacaoService';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends PaginaBase {

  loginFrmGroup: FormGroup
  foiSubmetido: boolean;
  loginModel: LoginModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    @Inject('IAutenticacaoService') public autenticacaoService: IAutenticacaoService,
    public loadingCtrl: LoadingController, public toasCtrl: ToastController) {
    super({ formBuilder: formBuilder, alertCtrl: alertCtrl, loadingCtrl: loadingCtrl, toastCtrl: toasCtrl });
    this.foiSubmetido = false;
    this.loginModel = new LoginModel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(): void {
    this.foiSubmetido = true;
    this.esconderToast();
    if (this.loginFrmGroup.valid) {
      this.mostrarLoading("atenticando...");
      this.autenticacaoService.login(this.loginModel).subscribe(
        data => {
          this.esconderLoading();
          this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward' });
        },
        err => {
          this.esconderLoading();
          this.mostrarToast(`${JSON.parse(err._body).erro.mensagem}`);
        }
      );
     
    }
  }

  protected doCarregarValidadores(): void {
    this.loginFrmGroup = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, CursoIonicValidadores.email])], // [inicialmente não valida nada, depois faz todas as validações]
      senha: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

}
