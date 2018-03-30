import { LoginModel } from "../models/loginModel";
import { Observable } from 'rxjs/Observable'

export interface IAutenticacaoService{
    login(loginModel:LoginModel): Observable<void>;
    logout():void;
}