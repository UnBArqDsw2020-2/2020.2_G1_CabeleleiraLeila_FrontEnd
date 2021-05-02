import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agenda, IAgenda } from 'src/shared/model/agenda.model';
import { Cliente, ICliente } from 'src/shared/model/cliente.model';
import { IPedido, Pedido } from 'src/shared/model/pedido.model';
import { IServico, Servico } from 'src/shared/model/servico.model';
import { PedidoService } from '../pedido/pedido.service';
import { ServicoService } from '../servicos/servicos.service';
import { TokenStorageService } from '../_services-auth/token-storage.service';
import { AgendamentoService } from './agendamento.service';
import * as moment from 'moment';

const horariosDiaComercial = [8, 9, 10, 11, 12, 14, 15, 16, 17, 18];

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})

export class AgendamentoComponent implements OnInit {
  
  agenda: IAgenda = new Agenda();
  agendasMarcadas: IAgenda[] = [];
  agendasCriadas: IAgenda[] = [];
  servico: IServico = new Servico();
  servicos: IServico[] = [];
  cliente: ICliente = new Cliente();
  pedido: IPedido = new Pedido();
  horariosDisponiveis = horariosDiaComercial;
  mostraHorarios: boolean;
  mostraFinalizaPedido: boolean;
  mostraAdicionaServico: boolean;

  constructor(
    private route: ActivatedRoute,
    private agendamentoService: AgendamentoService,
    private pedidoService: PedidoService,
    private servicoService: ServicoService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.tokenStorageService.getUserId();
    this.pedido.servicos = [];
    this.route.params.subscribe(params => {
      this.servico.id = params['idServico'];
      this.servicoService.find(this.servico.id).subscribe((res: HttpResponse<IServico>) => {
        this.servico = res.body;
        this.servicos.push(this.servico);
        this.pedido.valor = this.servico.valor;
        this.agenda.servico = this.servico;
        console.log('this.servicos', this.servicos);
        this.agendasCriadas.push(this.agenda);
      })
    });
  }

  buscarAgendas(): void {
    this.agendamentoService.findByDataServicoId(this.agenda.data, this.servico.id).subscribe(
      (res: HttpResponse<IAgenda[]>) => {
        this.agendasMarcadas = res.body;
        this.horariosDisponiveis = horariosDiaComercial;
        console.log('agendasMarcadas', this.agendasMarcadas);
        this.agendasMarcadas.forEach((agenda: IAgenda) => {
          this.horariosDisponiveis = this.horariosDisponiveis.filter(hora => hora !== agenda.hora);
        })
      },
      (res: HttpErrorResponse) => {
      },
      () => {
        this.mostraHorarios = !!this.agenda.data;
        console.log('mostraHorarios', this.mostraHorarios);
      }
    )
  }

  defineHora(hora: number): void {
    this.agenda.hora = hora;
    this.horariosDisponiveis = this.horariosDisponiveis.filter(horaOnList => horaOnList === hora);
    console.log('this.horariosDisponiveis', this.horariosDisponiveis);
    this.mostraAdicionaServico = true;
    this.mostraFinalizaPedido = true;
  }

  adicionarAgenda(): void {
    this.agenda.servico = this.servico;
    this.agendasCriadas.push(this.agenda);
  }

  finalizarPedido() {
    this.pedido.cliente = this.cliente; 
    this.pedido.data = moment().format("YYYY-MM-DD");
    this.pedido.confirmado = true;
    this.agendasCriadas.forEach((agenda: IAgenda) => {
      this.pedido.servicos.push(agenda.servico);
      this.agendamentoService.create(agenda).subscribe((res: HttpResponse<IAgenda>) => {
      })
    })
    this.pedidoService.create(this.pedido).subscribe((res: HttpResponse<IPedido>) => {
      this.pedido = res.body;
    });
  }
}
