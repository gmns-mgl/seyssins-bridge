import 'rxjs/add/operator/finally';

import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CompetitionService, Competition} from './competition.service';



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
      <h4 class="modal-title">{{ competition._id ? 'Editer une compétition' : 'Créer une compétition' }}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form>
        <div class="form-group">
          <input class="form-control" type="text" name="title" placeholder="Titre"  [style.color]="competition.color" [(ngModel)]="competition.title">
        </div>
        <div class="form-group" [(ngModel)]="competition.color" ngbRadioGroup name="radioBasic">
          <button *ngFor="let color of availableColors" class="btn btn-primary white-icon margin-right"
                  [style.backgroundColor]="color" (click)="competition.color = color">
            <i *ngIf="competition.color === color" class="fa fa-check"></i>
          </button>
        </div>
        <div class="form-group">
          <quill-editor name="message" [modules]="toolbar" [(ngModel)]="competition.message"></quill-editor>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">Fermer</button>
      <button type="submit" class="btn btn-primary" (click)="save()">{{competition._id ? 'Editer' : 'Créer'}}</button>
    </div>
  `
})
export class CompetitionModalContent {
  @Input() competition: Competition;
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
              private competitionService: CompetitionService) {
  }

  save(): void {
    this.isLoading = true;
    let observer;
    if (this.competition._id) {
      observer = this.competitionService.updateCompetition(this.competition);
    } else {
      observer = this.competitionService.createCompetition(this.competition);
    }
    observer.finally(() => this.isLoading = false)
      .subscribe((competition: Competition) => {
        this.activeModal.close(competition);
      }, () => {
        this.showError = true;
        this.errorMessage = 'Impossible de poursuivre';
      });
  }

  hideError() {
    this.showError = false;
  }
}
