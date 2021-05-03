import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { IAgendamento } from 'src/shared/model/agendamento.model';

type EntityResponseType = HttpResponse<IAgendamento>;
type EntityArrayResponseType = HttpResponse<IAgendamento[]>;

@Injectable({
  providedIn: 'root'
})

export class AgendamentoService {
  public resourceUrl = SERVER_API_URL + 'api/agendamentos';

  constructor(private http: HttpClient) { }

  create(agendamento: IAgendamento): Observable<EntityResponseType> {
    return this.http.post<IAgendamento>(this.resourceUrl, agendamento, { observe: 'response' });
  }

  createAll(agendamentos: IAgendamento[]): Observable<EntityArrayResponseType> {
    return this.http.post<IAgendamento[]>(this.resourceUrl + '/list', agendamentos, { observe: 'response' });
  }

  update(agendamento: IAgendamento): Observable<EntityResponseType> {
    return this.http.put<IAgendamento>(this.resourceUrl, agendamento, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAgendamento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByDataServicoId(data: string, idServico: number): Observable<EntityArrayResponseType> {
    return this.http.get<IAgendamento[]>(`${this.resourceUrl}/findByDataServicoId/${data}/${idServico}`, { observe: 'response' });
  }

  query(): Observable<EntityArrayResponseType> {
    return this.http.get<IAgendamento[]>(this.resourceUrl, { observe: 'response' });
  }

  delete(id: number): Observable<EntityResponseType> {
    return this.http.delete<IAgendamento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}