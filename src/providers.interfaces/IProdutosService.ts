import { Observable } from "rxjs/Observable";
import { ProdutoModel } from "../models/ProdutoModel";

export interface IProdutoService{

    listarProdutos(): Observable<ProdutoModel[]>; // aqui é onde a api vai retornar a lista

}