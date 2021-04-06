import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SERVER_API_URL } from '../app.constants';

const resourceUrl = SERVER_API_URL + 'api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin' : '*' ,'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(resourceUrl +'authenticate' , {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user: any): Observable<any> {
    return this.http.post(resourceUrl + 'user', {
      cpf: user.cpf,
      email: user.email,
      nascimento: user.nascimento,
      nome: user.nome,
      password1: user.password1,
      password2: user.password2,
      rg: user.rg,
      telefone: user.telefone,
      username: user.username
    }, httpOptions);
  }
}
