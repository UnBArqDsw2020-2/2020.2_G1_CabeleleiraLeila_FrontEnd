import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ROLE_ADMIN } from 'src/shared/constants/roles.constants';
import { IPessoa, Pessoa } from 'src/shared/model/pessoa.model';
import { IServico } from 'src/shared/model/servico.model';
import { TokenStorageService } from '../_services-auth/token-storage.service';
import { ServicoService } from './servicos.service';
@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {

  servicos: IServico[];
  mostraEditDeleteServico: boolean;
  pessoa: IPessoa = new Pessoa();

  constructor(
    private servicoService: ServicoService,
    private tokenStorageService: TokenStorageService
    ) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.pessoa.roles = this.tokenStorageService.getUserRoles();
      this.mostraEditDeleteServico = !!this.pessoa.roles.find(role => role === ROLE_ADMIN);
    }
    this.servicoService.query().subscribe((res: HttpResponse<IServico[]>) => 
    {
      this.servicos = res.body;
    });
  }

}
