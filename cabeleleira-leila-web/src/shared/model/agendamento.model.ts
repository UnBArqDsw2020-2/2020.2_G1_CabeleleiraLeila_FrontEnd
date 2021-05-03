import { IServico } from "./servico.model";

export interface IAgendamento{
    id?: number;
    data?: string;
    servico?: IServico;
    hora?: number;
    horariosDisponiveis?: number[];
    mostraHorarios?: boolean;
}

export class Agendamento implements IAgendamento {
    constructor(
        public id?: number,
        public data?: string,
        public hora?: number,
        public servico?: IServico,
        public horariosDisponiveis?: number[],
        public mostraHorarios?: boolean

    ) { }
}