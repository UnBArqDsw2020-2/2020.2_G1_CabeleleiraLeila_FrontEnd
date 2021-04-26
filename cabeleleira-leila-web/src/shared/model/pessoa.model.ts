import { Autenticacao, IAutenticacao } from "./autenticacao.model";

export interface IPessoa extends Autenticacao{
    id?: number;
    nome?: string;
    nascimento?: string;
    telefone?: number;
    rgEmissor?: string;
    cpf?: string;
    rg?: string;
    tipo?: string;
    roles?: string[];
}

export class Pessoa implements IPessoa {
    constructor(
        public id?: number,
        public nome?: string,
        public nascimento?: string,
        public telefone?: number,
        public rgEmissor?: string,
        public cpf?: string,
        public rg?: string,
        public tipo?: string,
        public autenticacao?: IAutenticacao,
        public roles?: string[]
    ) { }
}