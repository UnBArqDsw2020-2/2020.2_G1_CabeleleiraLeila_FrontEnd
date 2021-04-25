import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
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
  loginForm: FormGroup;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  pessoa: IPessoa = new Pessoa();


  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {
    window.localStorage.clear();
    this.loginForm = new FormGroup({
      username: new FormControl(this.pessoa.username),
      password1: new FormControl(this.pessoa.password1),
    });
  }

  onSubmit(): void {
    if (this.isValidToLogin()) {
      this.authService.login(this.pessoa).subscribe(
        (data: any) => {
          console.log('data', data);
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
          window.localStorage.setItem("token", data.token);
          this.isLoginFailed = false;
          this.pessoa.roles = this.tokenStorage.getUserRoles();
          this.router.navigate(['']);
          this.reloadPage();
        },
        (err: any) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
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

  private isValidToLogin(): boolean {
    let isValidToSave = true;
    Object.keys(this.loginForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.loginForm.get(key).errors;
      if (!!controlErrors) {
        isValidToSave = false;
      }
    });
    return isValidToSave;
  }
}

