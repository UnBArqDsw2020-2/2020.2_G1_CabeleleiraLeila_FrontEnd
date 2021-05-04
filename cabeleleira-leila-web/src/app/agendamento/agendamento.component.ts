import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente, ICliente } from 'src/shared/model/cliente.model';
import { IPedido, Pedido } from 'src/shared/model/pedido.model';
import { IServico, Servico } from 'src/shared/model/servico.model';
import { PedidoService } from '../pedido/pedido.service';
import { ServicoService } from '../servicos/servicos.service';
import { TokenStorageService } from '../_services-auth/token-storage.service';
import * as moment from 'moment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Agendamento, IAgendamento } from 'src/shared/model/agendamento.model';
import { AgendamentoService } from './agendamento.service';

const horariosDiaComercial = [8, 9, 10, 11, 12, 14, 15, 16, 17, 18];

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})

export class AgendamentoComponent implements OnInit {

  agendamentosMarcados: IAgendamento[] = [];
  agendamentos: IAgendamento[] = [];
  servico: IServico = new Servico();
  todosServicos: IServico[] = [];
  servicosAdicionados: IServico[] = [];
  servicosParaAdicionar: IServico[] = [];
  servicosParaRemover: IServico[] = [];
  cliente: ICliente = new Cliente();
  pedido: IPedido = new Pedido();
  mostraHorarios: boolean;
  mostraFinalizaPedidoAdicionaServico: boolean;
  closeResult = '';
  mostraServicosParaAdicionar: boolean;
  mostraServicosParaRemover: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agendamentoService: AgendamentoService,
    private pedidoService: PedidoService,
    private servicoService: ServicoService,
    private tokenStorageService: TokenStorageService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.tokenStorageService.getUserId();
    this.pedido.agendamentos = [];
    this.route.params.subscribe(params => {
      this.servico.id = params['idServico'];
      this.servicoService.find(this.servico.id).subscribe((res: HttpResponse<IServico>) => {
        const servicoAoAbrir = res.body;
        this.agendamentos.push(new Agendamento(null, null, null, servicoAoAbrir));
        this.servicosAdicionados.push(servicoAoAbrir);
      })
    });
    this.servicoService.query().subscribe((res: HttpResponse<IServico[]>) => {
      this.todosServicos = res.body;
    });
  }

  buscarAgendas(agendamento: IAgendamento): void {
    this.agendamentoService.findByDataServicoId(agendamento.data, this.servico.id).subscribe(
      (res: HttpResponse<IAgendamento[]>) => {
        this.agendamentosMarcados = res.body;
        agendamento.horariosDisponiveis = horariosDiaComercial;
        this.agendamentosMarcados.forEach((agenda: IAgendamento) => {
          agendamento.horariosDisponiveis = agendamento.horariosDisponiveis.filter(hora => hora !== agenda.hora);
        })
      },
      (res: HttpErrorResponse) => {
      },
      () => {
        agendamento.mostraHorarios = !!agendamento.data;
      }
    )
  }

  defineHora(hora: number, agendamento: IAgendamento): void {
    agendamento.hora = hora;
    agendamento.horariosDisponiveis = agendamento.horariosDisponiveis.filter(horaOnList => horaOnList === hora);
    this.mostraFinalizaPedidoAdicionaServico = true;
  }

  adicionarServicos(): void {
    const servicosSelecionados = this.servicosParaAdicionar.filter(servico => servico.selecionado);
    this.servicosAdicionados = this.servicosAdicionados.concat(servicosSelecionados);
    servicosSelecionados.forEach((servico: IServico) => {
      this.agendamentos.push(new Agendamento(null, null, null, servico));
    });
    this.modalService.dismissAll();
  }

  finalizarPedido() {
    this.pedido.cliente = this.cliente;
    this.pedido.data = moment().format("YYYY-MM-DD");
    this.pedido.confirmado = true;
    this.pedido.valor = 0;
    this.agendamentos.forEach((agendamento: IAgendamento) => {
      this.pedido.valor += agendamento.servico.valor;
    });
    this.agendamentoService.createAll(this.agendamentos).subscribe(
      (res: HttpResponse<IAgendamento[]>) => {
        this.agendamentos = res.body;
      },
      () => {

      },
      () => {
        this.pedido.agendamentos = this.agendamentos;
        this.pedidoService.create(this.pedido).subscribe((res: HttpResponse<IPedido>) => {
          this.pedido = res.body;
          this.router.navigate(['']);
        });
      });
  }

  selecionarServicosParaAdicionar(): void {
    this.servicosParaAdicionar = this.todosServicos;
    this.servicosAdicionados.forEach((servicoAdicionado) => {
      this.servicosParaAdicionar = this.servicosParaAdicionar.filter(servicoParaAdicionar => servicoParaAdicionar.id !== servicoAdicionado.id);
    });
    this.servicosParaAdicionar.forEach((servico: IServico) => {
      servico.selecionado = false;
    })
    this.mostraServicosParaAdicionar = true;
    this.mostraServicosParaRemover = false;
  }

  selecionarServicosParaRemover(): void {
    this.servicosParaRemover = this.servicosAdicionados;
    this.servicosParaRemover.forEach((servico: IServico) => {
      servico.selecionado = false;
    })
    this.mostraServicosParaRemover = true;
    this.mostraServicosParaAdicionar = false;
  }

  removerServicos(): void {
    this.servicosAdicionados = this.servicosParaRemover.filter(servico => !servico.selecionado);
    this.servicosParaRemover = this.servicosParaRemover.filter(servico => !servico.selecionado);
    this.servicosAdicionados.forEach((servico: IServico) => {
      this.agendamentos = this.agendamentos.filter(agendamento => agendamento.servico.id === servico.id);
    });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'myCustomModalClass' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  selecionaServicoParaAdicionar(servico: IServico): void {
    servico.selecionado = !servico.selecionado;
  }
}
