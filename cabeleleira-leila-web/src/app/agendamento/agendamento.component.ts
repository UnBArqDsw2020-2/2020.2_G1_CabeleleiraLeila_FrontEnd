import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agenda, IAgenda } from 'src/shared/model/agenda.model';
import { Cliente, ICliente } from 'src/shared/model/cliente.model';
import { IPedido, Pedido } from 'src/shared/model/pedido.model';
import { IServico, Servico } from 'src/shared/model/servico.model';
import { PedidoService } from '../pedido/pedido.service';
import { ServicoService } from '../servicos/servicos.service';
import { TokenStorageService } from '../_services-auth/token-storage.service';
import { AgendamentoService } from './agendamento.service';
import * as moment from 'moment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  todosServicos: IServico[] = [];
  servicosAdicionados: IServico[] = [];
  servicosParaAdicionar: IServico[] = [];
  servicosParaRemover: IServico[] = [];
  cliente: ICliente = new Cliente();
  pedido: IPedido = new Pedido();
  horariosDisponiveis = horariosDiaComercial;
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
    this.pedido.servicos = [];
    this.route.params.subscribe(params => {
      this.servico.id = params['idServico'];
      this.servicoService.find(this.servico.id).subscribe((res: HttpResponse<IServico>) => {
        this.servico = res.body;
        this.servicosAdicionados.push(this.servico);
        this.agenda.servico = this.servico;
        this.agendasCriadas.push(this.agenda);
      })
    });
    this.servicoService.query().subscribe((res: HttpResponse<IServico[]>) => {
      this.todosServicos = res.body;
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
    this.mostraFinalizaPedidoAdicionaServico = true;
  }

  adicionarServicos(): void {
    const servicosSelecionados = this.servicosParaAdicionar.filter(servico => servico.selecionado);
    this.servicosAdicionados = this.servicosAdicionados.concat(servicosSelecionados);
    this.modalService.dismissAll();
  }

  finalizarPedido() {
    this.pedido.cliente = this.cliente;
    this.pedido.data = moment().format(this.agenda.data);
    this.pedido.confirmado = true;
    this.pedido.valor = 0;
    this.agendasCriadas.forEach((agenda: IAgenda) => {
      this.servicosAdicionados.forEach((servicoAdicionado: IServico) => {
        this.pedido.servicos.push(servicoAdicionado);
        this.pedido.valor += servicoAdicionado.valor;
      })
      this.agendamentoService.create(agenda).subscribe((res: HttpResponse<IAgenda>) => {
      })
    })
    this.pedidoService.create(this.pedido).subscribe((res: HttpResponse<IPedido>) => {
      this.pedido = res.body;
      this.router.navigate(['']);
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
