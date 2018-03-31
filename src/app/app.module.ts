import { ProdutosPage } from './../pages/produtos/produtos';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AutenticacaoServiceProvider } from '../providers/autenticacao-service/autenticacao-service';
import {IAutenticacaoService} from '../providers.interfaces/IAutenticacaoService';
import { TabsPage } from '../pages/tabs/tabs';
import { PerfilPage } from '../pages/perfil/perfil';
import {NativeStorage} from '@ionic-native/native-storage'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    ProdutosPage,
    PerfilPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    ProdutosPage,
    PerfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: 'IAutenticacaoService', useClass: AutenticacaoServiceProvider},
    NativeStorage
  ]
})
export class AppModule {}
