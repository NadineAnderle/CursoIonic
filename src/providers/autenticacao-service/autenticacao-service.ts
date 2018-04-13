import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAutenticacaoService } from '../../providers.interfaces/IAutenticacaoService';
import { LoginModel } from '../../models/loginModel';
import { Observable } from 'rxjs/Rx';
import { ApiConsantes } from '../../app/ApiConstantes';

import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class AutenticacaoServiceProvider implements IAutenticacaoService {

  constructor(public http: HttpClient, private nativeStorage: NativeStorage) {
    console.log('Hello AutenticacaoServiceProvider Provider');
  }

  login(loginModel: LoginModel): Observable<void> {
    if (loginModel == null || loginModel.email == null || loginModel.senha == null) {
      return Observable.throw('Email e/ou senha não informados');
    }

    let corpoRequisicao = {
      email: loginModel.email,
      senha: loginModel.senha
    }

    return this.http.post(ApiConsantes.BASE_URL + '/' + ApiConsantes.Auth.LOGIN, corpoRequisicao)
    .map((res:any)=> {
      res;
      this.nativeStorage.setItem('token_autenticacao',{token:res.data.token})
                        .then(
                          ()=>console.log('token armazenado'),
                          (erro)=> alert(erro)
                        );  }) //native storage não usa observables e sim promisses
  }

  logout(): void {

  }

}
