import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoModel } from '../../models/ProdutoModel';


@IonicPage()
@Component({
  selector: 'page-detalhes-produto',
  templateUrl: 'detalhes-produto.html',
})
export class DetalhesProdutoPage {

  produto:ProdutoModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.produto= navParams.data.produto;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesProdutoPage');
  }

}
