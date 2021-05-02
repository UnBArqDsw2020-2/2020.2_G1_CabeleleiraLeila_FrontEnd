import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '.././app.constants';
import { IPedido } from 'src/shared/model/pedido.model';

type EntityResponseType = HttpResponse<IPedido>;
type EntityArrayResponseType = HttpResponse<IPedido[]>;

@Injectable({
  providedIn: 'root'
})

export class PedidoService {
  public resourceUrl = SERVER_API_URL + 'api/pedidos';

  constructor(private http: HttpClient) { }

  create(pedido: IPedido): Observable<EntityResponseType> {
    return this.http.post<IPedido>(this.resourceUrl, pedido, { observe: 'response' });
  }

  update(pedido: IPedido): Observable<EntityResponseType> {
    return this.http.put<IPedido>(this.resourceUrl, pedido, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPedido>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByClienteID(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IPedido[]>(`${this.resourceUrl}/findByCliente/${id}`, { observe: 'response' });
  }
  query(): Observable<EntityArrayResponseType> {
    return this.http.get<IPedido[]>(this.resourceUrl, { observe: 'response' });
  }

  delete(id: number): Observable<EntityResponseType> {
    return this.http.delete<IPedido>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}