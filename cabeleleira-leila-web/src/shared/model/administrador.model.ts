import { IPessoa } from "./pessoa.model copy";

export interface IAdministrador extends IPessoa{
    cnpj?: string;
    alvara?: string;
}

export class Administrador implements IAdministrador {
    constructor(
        public cnpj?: string,
        public obsalvaraervacoes?: string
    ) { }
}