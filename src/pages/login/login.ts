import { TabsPage } from './../tabs/tabs';
import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from 'ionic-angular';

import { PaginaBase } from '../../infraestrutura/PaginaBase'
import { CursoIonicValidadores } from '../../validadores/CursoIonicValidadores';
import { LoginModel } from '../../models/loginModel';
import { IAutenticacaoService } from '../../providers.interfaces/IAutenticacaoService';
import { ISubscription } from 'rxjs/Subscription';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends PaginaBase {

  loginFrmGroup: FormGroup
  foiSubmetido: boolean;
  loginModel: LoginModel;
  autenticado: boolean;
  private subscription: ISubscription;


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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
    
  }

  login(): void {
    this.foiSubmetido = true;
    this.esconderToast();
    if (this.loginFrmGroup.valid) {
      this.mostrarLoading("autenticando...");
      const subscription = this.autenticacaoService.login(this.loginModel).subscribe(
        data => {
          this.esconderLoading();
          //espera um segundo para gravar o token
          setTimeout(() => {
            this.navCtrl.setRoot(TabsPage, {}, { animate: true, direction: 'forward' });
          }, 1000);
        },
        err => {
          this.esconderLoading();
          this.mostrarToast(err.error.erro.menssagem);
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
