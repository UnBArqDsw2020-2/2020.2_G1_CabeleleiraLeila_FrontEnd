import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services-auth/token-storage.service';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IPessoa, Pessoa } from 'src/shared/model/pessoa.model';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { ROLE_ADMIN } from 'src/shared/constants/roles.constants';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  faUserCircle = faUserCircle;

  isLoggedIn: boolean;
  roles: string[] = [];
  faSignOutAlt = faSignOutAlt;
  pessoa: IPessoa = new Pessoa();
  userAdmin: boolean;
  mostraEntrarCadastrar: boolean;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.pessoa.roles = this.tokenStorageService.getUserRoles();
      this.pessoa.id = this.tokenStorageService.getUserId();
      this.userAdmin = !!this.pessoa.roles.find(role => role === ROLE_ADMIN);
    } else {
      this.mostraEntrarCadastrar = true;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}