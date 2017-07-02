import 'rxjs/add/operator/finally';

import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';

import {ActualityService, Actuality} from './actuality.service';
import {AuthentificationService} from '../core/authentification/authentification.service';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
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
      <h4 class="modal-title">{{ actuality._id ? 'Editer une actualité' : 'Créer une actualité' }}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form>
        <div class="form-group">
          <input class="form-control" type="text" name="title" placeholder="Titre"  [style.color]="actuality.color" [(ngModel)]="actuality.title">
        </div>
        <div class="form-group" [(ngModel)]="actuality.color" ngbRadioGroup name="radioBasic">
          <button *ngFor="let color of availableColors" class="btn btn-primary white-icon margin-right"
                  [style.backgroundColor]="color" (click)="actuality.color = color">
            <i *ngIf="actuality.color === color" class="fa fa-check"></i>
          </button>
        </div>
        <div class="form-group">
          <quill-editor name="message" [modules]="toolbar" [(ngModel)]="actuality.message"></quill-editor>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">Fermer</button>
      <button type="submit" class="btn btn-primary" (click)="save()">{{actuality._id ? 'Editer' : 'Créer'}}</button>
    </div>
  `
})
export class ActualityModalContent {
  @Input() actuality: Actuality;
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
              private actualityService: ActualityService) {
  }

  save(): void {
    this.isLoading = true;
    let observer;
    if (this.actuality._id) {
      observer = this.actualityService.updateActuality(this.actuality);
    } else {
      observer = this.actualityService.createActuality(this.actuality);
    }
    observer.finally(() => this.isLoading = false)
      .subscribe((actuality: Actuality) => {
        this.activeModal.close(actuality);
      }, () => {
        this.showError = true;
        this.errorMessage = 'Impossible de poursuivre';
      });
  }

  hideError() {
    this.showError = false;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: 'actuality.component.html',
  styleUrls: ['actuality.component.scss']
})
export class ActualityComponent implements OnInit {

  actualities: Actuality[];
  isAuthentificated: boolean = false;
  isLoading: boolean;

  constructor(private modalService: NgbModal,
              private actualityService: ActualityService,
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
    this.actualityService.getActualities({page: 1, actualityCount: 20})
      .finally(() => this.isLoading = false)
      .subscribe((actualities: Actuality[]) => this.actualities = actualities);
  }

  addOrEditActuality(actuality?: Actuality): void {
    let modalRef = this.modalService.open(ActualityModalContent);
    modalRef.componentInstance.actuality = Util.copy(actuality) || {};
    modalRef.result
      .then((actuality: Actuality) => {
        let index = _.findIndex(this.actualities, {_id: actuality._id});
        if (index >= 0) {
          this.actualities.splice(index, 1, actuality);
        } else {
          this.actualities.unshift(actuality);
        }
      })
      .catch(() => {});
  }

  deleteActuality(actuality: Actuality): void {
    this.actualityService.deleteActuality(actuality)
      .finally(() => this.isLoading = false)
      .subscribe(() => _.remove(this.actualities, actuality));
  }

}
