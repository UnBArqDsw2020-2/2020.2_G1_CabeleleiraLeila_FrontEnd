import { IPessoa } from "./pessoa.model copy";

export interface ICliente extends IPessoa{
    foto?: string;
    observacoes?: string;
}

export class Cliente implements ICliente {
    constructor(
        public foto?: string,
        public observacoes?: string
    ) { }
}