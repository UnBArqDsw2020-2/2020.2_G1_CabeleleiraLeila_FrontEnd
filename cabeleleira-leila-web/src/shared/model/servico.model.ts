export interface IServico {
    id?: number;
    nome?: string;
    descricao?: string;
    valor?: number;
    imagem?: string;
    nota?: number;
}

export class Servico implements IServico {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public valor?: number,
        public imagem?: string,
        public nota?: number
    ) { }
}
