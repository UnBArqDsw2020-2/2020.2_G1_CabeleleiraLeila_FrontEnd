import { IPessoa } from "./pessoa.model";

export interface ICliente extends IPessoa{
    interesses?: string[];
    observacoes?: string[];
}

export class Cliente implements ICliente {
    constructor(
        public interesses?: string[],
        public observacoes?: string[]
    ) { }
}