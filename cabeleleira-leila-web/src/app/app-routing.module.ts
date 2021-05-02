import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { ServicosComponent } from './servicos/servicos.component';
import { ServicoUpdateComponent } from './servicos/servico-update.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { PedidoComponent } from './pedido/pedido.component';

const routes: Routes = [
  { path: 'login-cadastro', component: LoginComponent },
  { path: 'tela-inicial', component: TelaInicialComponent },
  { path: '', component: TelaInicialComponent },
  { path: 'servicos', component: ServicosComponent },
  { path: 'adicionar-servico', component: ServicoUpdateComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'agendamento/:idServico', component: AgendamentoComponent }
  { path: 'agendamentos', component: PedidoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
