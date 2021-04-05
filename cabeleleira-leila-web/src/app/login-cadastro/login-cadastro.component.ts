import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-cadastro',
  templateUrl: './login-cadastro.component.html',
  styleUrls: ['./login-cadastro.component.css']
})
export class LoginCadastroComponent implements OnInit {

  mostraLogin = true;
  mostraCadastro = false;
  
  constructor() { 
  }
  
  ngOnInit(): void {

  }

  exibeLogin(): void {
    this.mostraCadastro = false;
    this.mostraLogin = true;
  }

  exibeCadastro(): void {
    this.mostraCadastro = true;
    this.mostraLogin = false;
  }
}
