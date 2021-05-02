import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '.././app.constants';
import { IAgenda } from 'src/shared/model/agenda.model';

type EntityResponseType = HttpResponse<IAgenda>;
type EntityArrayResponseType = HttpResponse<IAgenda[]>;

@Injectable({
  providedIn: 'root'
})

export class AgendamentoService {
  public resourceUrl = SERVER_API_URL + 'api/agenda';

  constructor(private http: HttpClient) { }

  create(agenda: IAgenda): Observable<EntityResponseType> {
    return this.http.post<IAgenda>(this.resourceUrl, agenda, { observe: 'response' });
  }

  update(agenda: IAgenda): Observable<EntityResponseType> {
    return this.http.put<IAgenda>(this.resourceUrl, agenda, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAgenda>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByDataServicoId(data: string, idServico: number): Observable<EntityArrayResponseType> {
    return this.http.get<IAgenda[]>(`${this.resourceUrl}/findByDataServicoId/${data}/${idServico}`, { observe: 'response' });
  }

  query(): Observable<EntityArrayResponseType> {
    return this.http.get<IAgenda[]>(this.resourceUrl, { observe: 'response' });
  }

  delete(id: number): Observable<EntityResponseType> {
    return this.http.delete<IAgenda>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}