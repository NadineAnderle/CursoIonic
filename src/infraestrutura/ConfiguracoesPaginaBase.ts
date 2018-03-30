import { FormBuilder } from "@angular/forms";
import { AlertController, LoadingController, ToastController } from "ionic-angular";


export interface ConfiguracoesPaginaBase{

    formBuilder?: FormBuilder;
    alertCtrl?: AlertController;
    loadingCtrl?: LoadingController;
    toastCtrl?: ToastController;
}