import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAutenticacaoService } from '../../providers.interfaces/IAutenticacaoService';
import { LoginModel } from '../../models/loginModel';
import { Observable } from 'rxjs/Rx';
import { ApiConsantes } from '../../app/ApiConstantes';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class AutenticacaoServiceProvider implements IAutenticacaoService {

  constructor(public http: HttpClient) {
    console.log('Hello AutenticacaoServiceProvider Provider');
  }

  login(loginModel: LoginModel): Observable<void> {
    if (!loginModel || !loginModel.email || loginModel.senha) {
      return Observable.throw('Email e/ou senha não informados');
    }

    let corpoRequisicao = {
      email: loginModel.email,
      senha: loginModel.senha
    }

    return this.http.post(ApiConsantes.BASE_URL + '/' + ApiConsantes.Auth.LOGIN, corpoRequisicao)
      .map(response => response.json()) //dispara a requisição para API
     }

  logout(): void {

  }

}
