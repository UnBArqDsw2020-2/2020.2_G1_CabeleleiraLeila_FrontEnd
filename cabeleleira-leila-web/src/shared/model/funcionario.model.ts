import { IPessoa } from "./pessoa.model copy";

export interface IFuncionario extends IPessoa{
    foto?: string;
    especioalidades?: string[];
}

export class Funcionario implements IFuncionario {
    constructor(
        public foto?: string,
        public especialidades?: string[]
    ) { }
}