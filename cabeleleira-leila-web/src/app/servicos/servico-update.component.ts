import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-servico-update',
  templateUrl: './servico-update.component.html',
  styles: [
  ]
})

export class ServicoUpdateComponent {
  closeResult = '';
  faPencilAlt = faPencilAlt;
  editarServico = true;
  criarServico = false;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
}
