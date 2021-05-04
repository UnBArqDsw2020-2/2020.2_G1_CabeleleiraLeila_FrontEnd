import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IPessoa, Pessoa } from 'src/shared/model/pessoa.model';
import { AuthService } from '../_services-auth/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  pessoa: IPessoa = new Pessoa();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.cadastroForm = new FormGroup({
      username: new FormControl(this.pessoa.username),
      nascimento: new FormControl(this.pessoa.nascimento),
      email: new FormControl(this.pessoa.email),
      telefone: new FormControl(this.pessoa.telefone),
      cpf: new FormControl(this.pessoa.cpf),
      password1: new FormControl(this.pessoa.password1),
      password2: new FormControl(this.pessoa.password2),
    });
  }

  onSubmit(): void {
    if (this.isValidToSave())
      this.authService.register(this.pessoa).subscribe(
        (data: any) => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.reloadPage();
        },
        (err: any) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
  }

  reloadPage(): void {
    window.location.reload();
  }

  private isValidToSave(): boolean {
    let isValidToSave = true;
    this.MustMatch(this.pessoa.password1, this.pessoa.password2)
    Object.keys(this.cadastroForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.cadastroForm.get(key).errors;
      if (!!controlErrors) {
        isValidToSave = false;
      }
    });
    return isValidToSave;
  }

  MustMatch(password1: string, password2: string) {
      if (password1 !== password2) {
        this.cadastroForm.controls.password1.setErrors({ mustMatch: true });
      } else {
        this.cadastroForm.controls.password1.setErrors(null);
      }
  }
}