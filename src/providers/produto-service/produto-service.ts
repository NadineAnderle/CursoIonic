import { Injectable } from '@angular/core';
import { IProdutoService } from '../../providers.interfaces/IProdutosService';
import { Observable } from "rxjs/Observable";
import { ProdutoModel } from '../../models/ProdutoModel';
import { NativeStorage } from '@ionic-native/native-storage';
import { Headers, RequestOptions, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import { ApiConsantes } from '../../app/ApiConstantes';


@Injectable()
export class ProdutoServiceProvider implements IProdutoService {

  constructor(public http: Http, private nativeStorage: NativeStorage) {
    console.log('Hello ProdutoServiceProvider Provider');
  }

  listarProdutos(): Observable<ProdutoModel[]> {
    console.log("vai buscar lista");
    //essa parte é só para a autenticacao
    //vem do observable from promise, para converter promise para observable
    let tokenObservable = Observable.fromPromise(this.nativeStorage.getItem('token_autenticacao')
      .then(data => { return data.token }, err => { return null })
    );
    
    return tokenObservable.flatMap(token => {
      let headers: Headers = new Headers();
      headers.append('token', token);
      let opts = new RequestOptions();
      opts.headers = headers;
      let url = ApiConsantes.BASE_URL + '/' + ApiConsantes.Produtos.GET;

      return this.http.get(url, opts).map((response: any) => {
        let res = response;
        console.log("response:"+response);
        console.log("res:"+res);
        let resultado: ProdutoModel[] = res.data.produtos.map(function (produto, index, arr) {
          let p: ProdutoModel = new ProdutoModel();
          p.id = produto.id;
          p.categoria = produto.categoria;
          p.descricao = produto.descricao;
          p.nome = produto.nome;
          p.icone = produto.categoria == 'doce' ? 'alert' : 'basket';
          console.log("p:"+p);
          return p;
        });
        console.log("resultado:"+resultado);
        console.log("response: fim");
        return resultado;
      });
    })
  }
}
