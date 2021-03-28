import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IServico, Servico } from 'src/shared/model/servico.model';
import { ServicoService } from './servicos.service';


@Component({
  selector: 'app-servico-delete',
  templateUrl: './servico-delete.component.html',
  styles: [
  ]
})
export class ServicoDeleteComponent implements OnInit {

  @Input()
  servico: IServico = new Servico();

  closeResult = '';
  faTrashAlt = faTrashAlt;

  constructor(
    private modalService: NgbModal,
    private servicoService: ServicoService) { }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  deletarServico(): void {
    this.servicoService.delete(this.servico.id).subscribe((res: HttpResponse<IServico>) => {
      this.modalService.dismissAll();
    });
  }
}
