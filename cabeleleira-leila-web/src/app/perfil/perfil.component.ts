import { HttpResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Cliente, ICliente } from 'src/shared/model/cliente.model';
import { TokenStorageService } from '../_services-auth/token-storage.service';
import { PerfilService } from './perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  cliente: ICliente = new Cliente();
  interesse: string;
  observacao: string;
  mostraSalvar: boolean;

  constructor(
    private clienteService: PerfilService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.tokenStorageService.getUserId();
    this.clienteService.find(this.cliente.id).subscribe(
      (res: HttpResponse<ICliente>) => {
        this.cliente = res.body;
      }
    )
    this.mostraSalvar = !!this.cliente.interesses || !!this.cliente.observacoes;
  }

  public adicionarInteresse(): void {
    this.mostraSalvar = true;
    if (!!this.cliente.interesses) {
      this.cliente.interesses.push(this.interesse);
    } else {
      this.cliente.interesses = [];
      this.cliente.interesses.push(this.interesse);
    }
  }

  public excluirInteresse(interesse: string): void {
    this.mostraSalvar = true;
    this.cliente.interesses = this.cliente.interesses.filter(clienteInteresse => clienteInteresse !== interesse);
  }

  adicionarObs(): void {
    this.mostraSalvar = true;
    if (!!this.cliente.observacoes) {
      this.cliente.observacoes.push(this.observacao);
    } else {
      this.cliente.observacoes = [];
      this.cliente.observacoes.push(this.observacao);
    }
  }

  excluirObs(observacao: string): void {
    this.mostraSalvar = true;
    this.cliente.observacoes = this.cliente.observacoes.filter(clienteObs => clienteObs !== observacao);
  }

  salvar(): void {
    this.clienteService.update(this.cliente).subscribe(
      (res: HttpResponse<ICliente>) => {
        this.cliente = res.body;
      }
    );
  }
}
