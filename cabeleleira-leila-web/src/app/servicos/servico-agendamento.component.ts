import { Component, Input, OnInit } from '@angular/core';
import { IServico } from 'src/shared/model/servico.model';
import { ServicoService } from './servicos.service';

@Component({
  selector: 'app-servico-agendamento',
  templateUrl: './servico-agendamento.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicoAgendamentoComponent implements OnInit {

  @Input()
  servico: IServico;

  constructor(private servicoService: ServicoService) { }

  ngOnInit(): void {
    
  }

}
