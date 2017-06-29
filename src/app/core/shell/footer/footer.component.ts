import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Identification administtrateur</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form>
        <div class="form-group">
          <input class="form-control" type="text" name="username" placeholder="Utilisateur" [(ngModel)]="username">
        </div>
        <div class="form-group">
          <input class="form-control" type="password" name="password" placeholder="Mot de passe" [(ngModel)]="password">
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">Fermer</button>
      <button type="submit" class="btn btn-primary" (click)="login()">S'authentifier</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() username: string;
  @Input() password: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  login(): void {
    this.activeModal.close({username: this.username, password: this.password});
  }
}

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private modalService: NgbModal) {
  }

  openModal() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
    modalRef.result
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      })
  }

  closeModal(id: string) {
  }

  ngOnInit() {
  }

}
