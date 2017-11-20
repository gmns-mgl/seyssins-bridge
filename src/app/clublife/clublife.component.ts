import 'rxjs/add/operator/finally';

import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {Response} from '@angular/http';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ClublifeService, Clublife} from './clublife.service';
import {AuthentificationService} from '../core/authentification/authentification.service';
import {Util} from '../core/util.service';

@Component({
  selector: 'ngbd-modal-content',
  styles: [`
    .white-icon {
      color: white;
      height: 40px;
      width: 50px;
    }
  `],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ clublife._id ? 'Editer une information' : 'Créer une nouvelle information' }}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form>
        <div class="form-group">
          <input class="form-control" type="text" name="title" placeholder="Titre"  [style.color]="clublife.color" [(ngModel)]="clublife.title">
        </div>
        <div class="form-group" [(ngModel)]="clublife.color" ngbRadioGroup name="radioBasic">
          <button *ngFor="let color of availableColors" class="btn btn-primary white-icon margin-right"
                  [style.backgroundColor]="color" (click)="clublife.color = color">
            <i *ngIf="clublife.color === color" class="fa fa-check"></i>
          </button>
        </div>
        <div class="form-group">
          <quill-editor name="message" [modules]="toolbar" [(ngModel)]="clublife.message"></quill-editor>
        </div>
      </form>
      <ngb-alert *ngIf="showError" type="warning" (close)="hideError()">Une erreur a eu lieu lors de la sauvegarde. Veuillez rééssayer plus tard ou contactez le webmaster.</ngb-alert>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">Fermer</button>
      <button type="submit" class="btn btn-primary" (click)="save()" [disabled]="!clublife.title || !clublife.message">{{clublife._id ? 'Editer' : 'Créer'}}</button>
    </div>
  `
})
export class ClublifeModalContent {
  @Input() clublife: Clublife;
  showError: boolean = false;
  availableColors = ['#000000', '#55595c', '#3D9B3D', '#d9534f', '#f0ad4e', '#5bc0de'];
  errorMessage: string;
  isLoading: boolean;
  toolbar: any = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'size': ['small', false, 'large'] }],
      [{ 'color': [] }],
      [{ 'align': [] }],
      [{ 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }]
    ]
  };


  constructor(public activeModal: NgbActiveModal,
              private clublifeService: ClublifeService) {
  }

  save(): void {
    this.isLoading = true;
    let observer;
    if (this.clublife._id) {
      observer = this.clublifeService.updateClublife(this.clublife);
    } else {
      observer = this.clublifeService.createClublife(this.clublife);
    }
    observer.finally(() => this.isLoading = false)
      .subscribe((clublife: Clublife) => {
        this.activeModal.close(clublife);
      }, () => {
        this.showError = true;
        this.errorMessage = 'Impossible de poursuivre';
      });
  }

  hideError() {
    this.showError = false;
  }
}

const EMAIL_PATTERN = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;

@Component({
  selector: 'app-home',
  templateUrl: 'clublife.component.html',
  styleUrls: ['clublife.component.scss']
})
export class ClublifeComponent implements OnInit {

  clublife: Clublife[];
  isAuthentificated: boolean = false;
  errorMessage: string;
  showError: boolean = false;
  showSuccess: boolean = false;
  isLoading: boolean;
  email: string;

  constructor(private modalService: NgbModal,
              private clublifeService: ClublifeService,
              private authentificationService: AuthentificationService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.authentificationService.isAuthentificated()
      .then((isAuthentificated: boolean) => {
        this.isAuthentificated = isAuthentificated;
      });
    this.authentificationService.getAuthentificationObserver
      .subscribe((isAuthentificated) => this.isAuthentificated = isAuthentificated);
    this.clublifeService.getClublife({page: 1, clublifeCount: 20})
      .finally(() => this.isLoading = false)
      .subscribe((cl: Clublife[]) => this.clublife = cl);
  }

  addOrEditClublife(cl?: Clublife): void {
    const modalRef = this.modalService.open(ClublifeModalContent);
    modalRef.componentInstance.clublife = Util.copy(cl) || {};
    modalRef.result
      .then((clublifeResult: Clublife) => {
        const index = _.findIndex(this.clublife, {_id: clublifeResult._id});
        if (index >= 0) {
          this.clublife.splice(index, 1, clublifeResult);
        } else {
          this.clublife.unshift(clublifeResult);
        }
      })
      .catch(() => {});
  }

  deleteClublife(cl: Clublife): void {
    this.clublifeService.deleteClublife(cl)
      .finally(() => this.isLoading = false)
      .subscribe(() => _.remove(this.clublife, cl));
  }

  subscribe(): void {
    this.showSuccess = false;
    this.showError = false;
    if (!this.email && !EMAIL_PATTERN.test(this.email)) {
      return;
    }
    this.authentificationService.addUser(this.email)
      .subscribe(() => {
        this.showSuccess = true;
      }, (err: Response) => {
        switch (err.json().code) {
          case 403:
            this.errorMessage = 'Vous êtes déjà inscrit aux nouvelles informations de la vie du club. Si vous ne recevez aucun mail, regardez dans votre dossier de spam ou contactez le webmaster.';
            break;
          case 401:
            this.errorMessage = 'Votre email ne correspond pas à un email valide (il s\'agit d\'une boîte de réception temporaire).';
            break;
          default:
            this.errorMessage = 'Si vous vous êtes désinscrit par erreur, contactez le webmaster pour vous réinscrire manuellement.';
            break;
        }
        this.showError = true;
      });
  }

  closeSuccessAlert() {
    this.showSuccess = false;
  }

  closeErrorAlert() {
    this.showError = false;
  }

  isEmailInvalid(): boolean {
    return this.email && !EMAIL_PATTERN.test(this.email);
  }

}
