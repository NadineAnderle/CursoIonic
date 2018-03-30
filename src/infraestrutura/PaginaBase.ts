import { FormBuilder } from "@angular/forms";
import { ConfiguracoesPaginaBase } from "./ConfiguracoesPaginaBase";
import { AlertController, LoadingController, Loading, ToastController, Toast } from "ionic-angular";


export abstract class PaginaBase {

    protected _formBuilder?: FormBuilder;
    protected _alertCtrl?: AlertController;
    protected _loadingCtrl?: LoadingController;
    protected _loading?: Loading;
    protected _toastCtrl?: ToastController;
    protected _toast?: Toast;

    constructor(cpb: ConfiguracoesPaginaBase) {
        this._formBuilder = cpb.formBuilder;
        this._alertCtrl = cpb.alertCtrl;
        this._loadingCtrl = cpb.loadingCtrl;
        this._toastCtrl = cpb.toastCtrl;
        this.carregarValidadores();
    }

    protected carregarValidadores(): void {
        if (this._formBuilder != null) {
            this.doCarregarValidadores();
        }
    }

    protected doCarregarValidadores(): void {

    }

    protected mostrarMenssagemErro(menssagem: string) {
        if (this._alertCtrl != null) {
            let alert = this._alertCtrl.create({
                title: 'Erro',
                subTitle: menssagem,
                buttons: ["OK"]
            });
            alert.present();
        }
    }

    protected mostrarLoading(mensagem: string, duracao: number = 0) {
        if (duracao == 0) {
            this._loading = this._loadingCtrl.create({
                content: mensagem
            });
        } else {
            this._loading = this._loadingCtrl.create({
                duration: duracao,
                content: mensagem
            });
        }
        this._loading.present();
    }

    protected esconderLoading(): void{
        if (this._loading!=null){
            this._loading.dismiss();
        }
    }

    protected mostrarToast(mensagem:string){
        this._toast=this._toastCtrl.create({
            position: 'bottom',
            showCloseButton:true,
            closeButtonText:'OK'
        });
        this._toast.setMessage(mensagem);
        this._toast.present();
    }

    protected esconderToast(){
        if(this._toast!=null){
            this._toast.dismiss();
        }
    }
    
}