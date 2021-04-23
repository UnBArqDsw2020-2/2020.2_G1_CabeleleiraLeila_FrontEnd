import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPessoa, Pessoa } from 'src/shared/model/pessoa.model';
import { AuthService } from '../_services-auth/auth.service';
import { TokenStorageService } from '../_services-auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mostraLogin = true;
  mostraCadastro = false;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  pessoa: IPessoa = new Pessoa();
  
  
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {
  }
  
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUserRoles();
    }
  }

  onSubmit(): void {
    window.localStorage.clear();
    this.authService.login(this.pessoa).subscribe(
      (data: any) => {
        console.log('data', data);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        window.localStorage.setItem("token",data.token);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.pessoa.roles = this.tokenStorage.getUserRoles();
        console.log('tokendecodificado', this.pessoa.roles);
        this.router.navigate(['']);
      },
      (err: any) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
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

