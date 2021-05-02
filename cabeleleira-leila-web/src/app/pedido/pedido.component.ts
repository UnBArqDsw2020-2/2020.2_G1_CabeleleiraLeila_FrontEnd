import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IPedido } from 'src/shared/model/pedido.model';
import { TokenStorageService } from '../_services-auth/token-storage.service';
import { PedidoService } from './pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  idCliente: number;
  pedidos: IPedido[];

  constructor(
    private pedidoService: PedidoService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.idCliente = this.tokenStorageService.getUserId();
    this.pedidoService.findByClienteID(this.idCliente).subscribe(
      (res: HttpResponse<IPedido[]>) => {
        this.pedidos = res.body;
        console.log('pedidos', this.pedidos);
      });
  }

}
