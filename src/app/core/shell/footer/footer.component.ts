import {Component, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthentificationService} from "../../authentification/authentification.service";

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Identification administrateur</h4>
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
      <ngb-alert type="warning" *ngIf="showError" (close)="hideError()">{{ errorMessage }}</ngb-alert>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">Fermer</button>
      <button type="submit" class="btn btn-primary" (click)="login()">S'authentifier</button>
    </div>
  `
})
export class NgbdModalContent {
  username: string;
  password: string;
  showError: boolean = false;
  errorMessage: string;

  constructor(public activeModal: NgbActiveModal,
              private authentificationService: AuthentificationService) {
  }

  login(): void {
    this.authentificationService.login(this.username, this.password)
      .subscribe((response: any) => {
        let token = response.token;
        this.authentificationService.saveToken(token);
        this.activeModal.close(true);
      }, (error: any) => {
        this.showError = true;
        switch (error.code) {
          case 403:
            this.errorMessage = 'Le mot de passe ne correspond pas.';
            break;
          case 404:
            this.errorMessage = 'L\'utilisateur n\'existe pas.';
            break;
          default:
            this.errorMessage = 'Une erreur interne s\'est produite, contactez votre administrateur.';
            break;
        }
      });
  }

  hideError() {
    this.showError = false;
  }
}

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.scss']
})
export class FooterComponent implements OnInit {

  isAuthentificated: boolean = false;

  constructor(private modalService: NgbModal,
              private authentificationService: AuthentificationService) {
  }

  openModal() {
    this.modalService.open(NgbdModalContent).result
      .then((authentificated: boolean) => {
        this.isAuthentificated = authentificated;
      });
  }

  disconnect() {
    this.authentificationService.clearToken();
    this.isAuthentificated = false;
  }

  ngOnInit() {
    this.authentificationService.isAuthentificated()
      .then((isAuthentificated: boolean) => {
        this.isAuthentificated = isAuthentificated;
      });
  }

}
