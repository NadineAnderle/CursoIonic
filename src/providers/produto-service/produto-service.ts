import { Injectable } from '@angular/core';
import { IProdutoService } from '../../providers.interfaces/IProdutosService';
import { Observable } from "rxjs/Observable";
import { ProdutoModel } from '../../models/ProdutoModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import { ApiConsantes } from '../../app/ApiConstantes';
import { Storage } from '@ionic/storage';


@Injectable()
export class ProdutoServiceProvider implements IProdutoService {

  constructor(private storage: Storage, public httpClient: HttpClient) {
    console.log('Hello ProdutoServiceProvider Provider');
  }

  listarProdutos(): Observable<ProdutoModel[]> {
    //essa parte é só para a autenticacao
    //vem do observable from promise, para converter promise para observable
    let tokenObservable = Observable.fromPromise(this.storage.get('token_autenticacao')
      .then(res => {
        console.log("data:" + res.token);
        return res.token
      },
        err => {
          console.log("data" + err);
          return err
        })
    );

    return tokenObservable.flatMap(chave => {
      let headers = new HttpHeaders();
      let otherHeaders = headers.append("token", chave);//isso aqui foi uma gambia pra conseguir setar o headers

      let url = ApiConsantes.BASE_URL + '/' + ApiConsantes.Produtos.GET;
      
      return this.httpClient.get(url, { headers: otherHeaders }).map((response: any) => {
        let res = response;
        
        let resultado: ProdutoModel[] = res.data.produtos.map(function (produto, index, arr) {
          let p: ProdutoModel = new ProdutoModel();
          p.id = produto.id;
          p.categoria = produto.categoria;
          p.descricao = produto.descricao;
          p.nome = produto.nome;
          p.icone = produto.categoria == 'doces' ? 'alert' : 'basket';
          return p;
        })
        return resultado;
      });
    })
  }
}
