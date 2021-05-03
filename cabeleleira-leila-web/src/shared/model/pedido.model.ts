import { IAgendamento } from "./agendamento.model";
import { ICliente } from "./cliente.model";

export interface IPedido {
    id?: number;
    valor?: number;
    data?: string;
    confirmado?: boolean;
    cliente?: ICliente;
    agendamentos?: IAgendamento[];
}

export class Pedido implements IPedido {
    constructor(
        public id?: number,
        public valor?: number,
        public data?: string,
        public confirmado?: boolean,
        public cliente?: ICliente,
        public agendamentos?: IAgendamento[]
    ) { }
}