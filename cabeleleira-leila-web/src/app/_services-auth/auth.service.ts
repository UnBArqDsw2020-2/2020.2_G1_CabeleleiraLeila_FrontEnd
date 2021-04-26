import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SERVER_API_URL } from '../app.constants';
import { IPessoa } from 'src/shared/model/pessoa.model';

const resourceUrl = SERVER_API_URL + 'api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin' : '*' ,'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(pessoa: IPessoa): Observable<any> {
    return this.http.post(resourceUrl +'authenticate' , {
      username: pessoa.username,
      password: pessoa.password1
    }, httpOptions);
  }

  register(pessoa: IPessoa): Observable<any> {
    return this.http.post(resourceUrl + 'user', {
      cpf: pessoa.cpf,
      email: pessoa.email,
      nascimento: pessoa.nascimento,
      nome: pessoa.nome,
      password1: pessoa.password1,
      password2: pessoa.password2,
      rg: pessoa.rgEmissor,
      telefone: pessoa.telefone,
      username: pessoa.username
    }, httpOptions);
  }
}
