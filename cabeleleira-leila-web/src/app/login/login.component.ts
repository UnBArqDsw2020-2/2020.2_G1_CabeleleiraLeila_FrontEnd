import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      (data: any) => {
        console.log('data', data);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        window.localStorage.setItem("token",data.token);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['']);
        this.reloadPage();
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

