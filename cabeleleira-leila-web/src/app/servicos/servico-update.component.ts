import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { IServico, Servico } from 'src/shared/model/servico.model';
import { ServicoService } from './servicos.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-servico-update',
  templateUrl: './servico-update.component.html',
  styles: [
  ]
})

export class ServicoUpdateComponent {

  @Input()
  servico: IServico = new Servico();

  @Input()
  editaServico: boolean;

  @Input()
  criaServico: boolean;

  closeResult = '';
  faPencilAlt = faPencilAlt;

  constructor(
    private modalService: NgbModal,
    private servicoService: ServicoService) { }

  ngOnInit(): void {
    console.log('servico', this.servico);
    this.defineTela();
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private defineTela(): void {
    if (!!this.servico.id) {
      this.editaServico = true;
    } else {
      this.criaServico = true;
    }
  }

  saveServico(): void {
    if (this.editaServico) {
      this.servicoService.update(this.servico).subscribe((res: HttpResponse<IServico>) => {
        this.servico = res.body;
        this.modalService.dismissAll();
      });
    } else {
      this.servicoService.create(this.servico).subscribe((res: HttpResponse<IServico>) => {
        this.servico = res.body;
        this.modalService.dismissAll();
      });
    }
    
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
