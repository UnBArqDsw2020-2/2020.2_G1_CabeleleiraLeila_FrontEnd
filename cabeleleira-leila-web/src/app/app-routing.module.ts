import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCadastroComponent } from './login-cadastro/login-cadastro.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { ServicosComponent } from './servicos/servicos.component';
import { ServicoUpdateComponent } from './servicos/servico-update.component';

const routes: Routes = [
  { path: 'login-cadastro', component: LoginCadastroComponent },
  { path: '', component: TelaInicialComponent },
  { path: 'servicos', component: ServicosComponent },
  { path: 'adicionar-servico', component: ServicoUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
