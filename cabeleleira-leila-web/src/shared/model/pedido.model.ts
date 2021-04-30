import { ICliente } from "./cliente.model";
import { IServico } from "./servico.model";

export interface IPedido {
    id?: number;
    valor?: number;
    data?: string;
    confirmado?: boolean;
    cliente?: ICliente;
    servicos?: IServico[];
}

export class Pedido implements IPedido {
    constructor(
        public id?: number,
        public valor?: number,
        public data?: string,
        public confirmado?: boolean,
        public cliente?: ICliente,
        public servicos?: IServico[]
    ) { }
}