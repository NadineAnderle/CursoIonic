import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, ActionSheetController } from 'ionic-angular';
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
  produtosFiltrados: ProdutoModel[];
  termo: string;
  filtradoPorCategoria: boolean;
  categoriaSelecionada: string;


  constructor(public navCtrl: NavController,
    public navParams: NavParams, public loadingCtrl: LoadingController, public toasCtrl: ToastController,
    public alertCtrl: AlertController, private produtoService: ProdutoServiceProvider,
    public actionSheetCtrl: ActionSheetController) {
    super({ alertCtrl: alertCtrl, loadingCtrl: loadingCtrl, toastCtrl: toasCtrl });
    this.termo = "";
  }

  ionViewDidLoad() {
    this.mostrarLoading("Buscando produtos...");
    this.produtoService.listarProdutos().subscribe(resposta => {
      this.esconderLoading();
      this.produtos = resposta;
      this.produtosFiltrados = resposta;
      this.filtradoPorCategoria = false;
      this.categoriaSelecionada = '';
    },
      erro => {
        this.esconderLoading();
        this.mostrarMenssagemErro(`Erro ao mostrar os produtos: ${erro}`);
      });

  }

  //faz navegação
  mostrarDetalhesProduto(produto: ProdutoModel) {
    this.navCtrl.push(DetalhesProdutoPage, {
      produto: produto //passando o parametro
    });
  }

  filtrarProdutosPorNome(): void {
    if (!this.filtradoPorCategoria) {
      if (this.termo == "") {
        this.produtosFiltrados = this.produtos;
      } else {
        this.produtosFiltrados = this.produtos.filter((produto) => {
          return produto.nome.toLowerCase().indexOf(this.termo.toLowerCase()) > -1;
        });
      }
    }else{
      if (this.termo == "") {
        this.produtosFiltrados = this.produtos.filter((produto) => {
          produto.categoria=this.categoriaSelecionada;
        });
      } else {
        this.produtosFiltrados = this.produtos.filter((produto) => {
          return produto.nome.toLowerCase().indexOf(this.termo.toLowerCase()) > -1 && 
          produto.categoria==this.categoriaSelecionada;
        });
      }
    }
  }

  filtrarPorCategoria(): void {
    this.termo = "";
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Filtro por categoria',
      buttons: [
        {
          text: 'Doces',
          handler: () => {
            this.categoriaSelecionada = 'doces';
            this.filtradoPorCategoria = true;
            this.produtosFiltrados = this.produtos.filter((produto) => {
              return produto.categoria == 'doces';
            });
          }
        },
        {
          text: 'Salgados',
          handler: () => {
            this.categoriaSelecionada = 'salgados';
            this.filtradoPorCategoria = true;
            this.produtosFiltrados = this.produtos.filter((produto) => {
              return produto.categoria == 'salgados';
            });
          }
        },
        {
          text: '(Todas)',
          role: 'cancel',
          handler: () => {
            this.categoriaSelecionada = '';
            this.termo = '';
            this.filtradoPorCategoria = false;
            this.produtosFiltrados = this.produtos; 
          }
        }
      ]
    });
    actionSheet.present();
  }

}
