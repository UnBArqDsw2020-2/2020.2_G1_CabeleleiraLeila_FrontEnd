export interface IAutenticacao {
    username?: string;
    password1?: string;
    password2?: string;
    email?: string;
}

export class Autenticacao implements IAutenticacao {
    constructor(
        public username?: string,
        public password1?: string,
        public password2?: string,
        public email?: string
    ) { }
}
