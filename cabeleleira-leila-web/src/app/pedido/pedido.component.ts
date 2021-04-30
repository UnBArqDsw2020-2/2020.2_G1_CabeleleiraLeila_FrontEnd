import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IPedido } from 'src/shared/model/pedido.model';
import { PedidoService } from './pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  @Input()
  idCliente: number;
  pedidos: IPedido[];

  constructor(
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    this.pedidoService.findByClienteID(this.idCliente).subscribe(
      (res: HttpResponse<IPedido[]>) => {
        this.pedidos = res.body;
        console.log('pedidos', this.pedidos);
      });
  }

}
