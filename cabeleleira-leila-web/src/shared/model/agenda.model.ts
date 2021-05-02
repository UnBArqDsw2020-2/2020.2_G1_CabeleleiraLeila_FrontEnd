import { IServico } from "./servico.model";

export interface IAgenda{
    id?: number;
    data?: string;
    hora?: number;
    servico?: IServico;
}

export class Agenda implements IAgenda {
    constructor(
        public id?: number,
        public data?: string,
        public hora?: number,
        public servico?: IServico,
    ) { }
}