import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { PaginaBase } from '../../infraestrutura/PaginaBase';
import { ProdutoModel } from '../../models/ProdutoModel';
import { ProdutoServiceProvider } from '../../providers/produto-service/produto-service';
import { DetalhesProdutoPage } from '../detalhes-produto/detalhes-produto';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage extends PaginaBase {

  produtos: ProdutoModel[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams, public loadingCtrl: LoadingController, public toasCtrl: ToastController,
    public alertCtrl: AlertController, private produtoService: ProdutoServiceProvider) {
    super({ alertCtrl: alertCtrl, loadingCtrl: loadingCtrl, toastCtrl: toasCtrl });
  }

  ionViewDidLoad() {
    this.mostrarLoading("Buscando produtos...");
    this.produtoService.listarProdutos().subscribe(resposta => {
      this.produtos = resposta;
    },
      erro => {
        this.esconderLoading();
        this.mostrarMenssagemErro(`Erro ao mostrar os produtos: ${erro}`);
      });
      alert("propriedade:"+this.produtos);
  }

  //faz navegação
  mostrarDetalhesProduto(produto: ProdutoModel){
    this.navCtrl.push(DetalhesProdutoPage, {
      produto:produto //passando o parametro
    });
  }

}
