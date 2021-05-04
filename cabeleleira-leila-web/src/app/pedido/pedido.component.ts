import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IPedido } from 'src/shared/model/pedido.model';
import { TokenStorageService } from '../_services-auth/token-storage.service';
import { PedidoService } from './pedido.service';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { IAgendamento } from 'src/shared/model/agendamento.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  @Input()
  userAdmin: boolean;

  
  pedidos: IPedido[];
  pedidosFiltrados: IPedido[];
  faCalendar = faCalendar;
  faClock = faClock;
  faMoneyBillWave = faMoneyBillWave;
  dataInicio: string;
  dataFim: string;
  mostraFiltrar = true;

  idCliente: number;


  constructor(
    private pedidoService: PedidoService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.idCliente = this.tokenStorageService.getUserId();
    this.loadPedidos();
  }

  loadPedidos(): void{
    if (!this.userAdmin) {
      this.pedidoService.findByClienteID(this.idCliente).subscribe(
        (res: HttpResponse<IPedido[]>) => {
          this.pedidos = res.body;
        });
    } else {
      this.pedidoService.query().subscribe((res: HttpResponse<IPedido[]>) => {
        this.pedidos = res.body;
      });
    }
  }

  selecionaAgendamentosPedidosPorData(inicio: string, fim: string) {
    if(!this.mostraFiltrar){
      window.location.reload();
    }
    this.mostraFiltrar = !this.mostraFiltrar;
    this.pedidos.forEach((pedido: IPedido) => {
      pedido.agendamentos = pedido.agendamentos.filter(agendamento => (moment(agendamento.data).isBetween(moment(inicio), moment(fim)) ||
        moment(agendamento.data).isSame(moment(inicio)) ||
        moment(agendamento.data).isSame(moment(fim))));
    });
  }

}
