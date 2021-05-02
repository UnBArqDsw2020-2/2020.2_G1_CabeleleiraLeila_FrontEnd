import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '.././app.constants';
import { ICliente } from 'src/shared/model/cliente.model';

type EntityResponseType = HttpResponse<ICliente>;
type EntityArrayResponseType = HttpResponse<ICliente[]>;

@Injectable({
  providedIn: 'root'
})

export class PerfilService {
  public resourceUrl = SERVER_API_URL + 'api/clientes';

  constructor(private http: HttpClient) { }

  update(cliente: ICliente): Observable<EntityResponseType> {
    return this.http.put<ICliente>(this.resourceUrl, cliente, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICliente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  delete(id: number): Observable<EntityResponseType> {
    return this.http.delete<ICliente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}