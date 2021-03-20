import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCadastroComponent } from './login-cadastro/login-cadastro.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';


const routes: Routes = [
  {path: 'login-cadastro', component: LoginCadastroComponent},
  {path: 'tela-inicial', component: TelaInicialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
