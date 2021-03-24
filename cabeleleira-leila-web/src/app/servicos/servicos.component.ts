import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IServico } from 'src/shared/model/servico.model';
import { ServicoService } from './servicos.service';
@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {

  servicos: IServico[];

  constructor(
    private servicoService: ServicoService
    ) { }

  ngOnInit(): void {
    this.servicoService.query().subscribe((res: HttpResponse<IServico[]>) => 
    {
      this.servicos = res.body;
    });
  }

}
