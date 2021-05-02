import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServicosComponent } from './servicos/servicos.component';
import { ServicoUpdateComponent } from './servicos/servico-update.component';
import { ServicoDeleteComponent } from './servicos/servico-delete.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { PerfilComponent } from './perfil/perfil.component';
import { PedidoComponent } from './pedido/pedido.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { ServicoAgendamentoComponent } from './servicos/servico-agendamento.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import 'bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    TelaInicialComponent,
    ServicosComponent,
    ServicoUpdateComponent,
    ServicoDeleteComponent,
    NavBarComponent,
    PerfilComponent,
    PedidoComponent,
    AgendamentoComponent,
    ServicoAgendamentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    BsDropdownModule.forRoot()
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
