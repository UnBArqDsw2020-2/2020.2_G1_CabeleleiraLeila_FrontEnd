import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { ServicosComponent } from './servicos/servicos.component';
import { ServicoUpdateComponent } from './servicos/servico-update.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  { path: 'login-cadastro', component: LoginComponent },
  { path: 'tela-inicial', component: TelaInicialComponent },
  { path: '', component: TelaInicialComponent },
  { path: 'servicos', component: ServicosComponent },
  { path: 'adicionar-servico', component: ServicoUpdateComponent },
  { path: 'perfil', component: PerfilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
