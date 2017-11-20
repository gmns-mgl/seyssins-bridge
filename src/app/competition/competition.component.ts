import 'rxjs/add/operator/finally';

import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {Response} from '@angular/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {CompetitionService, Competition} from './competition.service';
import {AuthentificationService} from '../core/authentification/authentification.service';
import {Util} from '../core/util.service';
import {CompetitionModalContent} from './competition.modal.component';

const EMAIL_PATTERN = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;

@Component({
  selector: 'app-competition',
  templateUrl: 'competition.component.html',
  styleUrls: ['competition.component.scss']
})
export class CompetitionComponent implements OnInit {


  competitions: Competition[] = [];
  isAuthentificated: boolean = false;
  errorMessage: string;
  showError: boolean = false;
  showSuccess: boolean = false;
  isLoading: boolean;
  email: string;

  constructor(private modalService: NgbModal,
              private competitionService: CompetitionService,
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
    this.competitionService.getCompetitions({page: 1, competitionCount: 20})
      .finally(() => this.isLoading = false)
      .subscribe((competitions: Competition[]) => this.competitions = competitions);
  }

  addOrEditCompetition(competition?: Competition): void {
    let modalRef = this.modalService.open(CompetitionModalContent);
    modalRef.componentInstance.competition = Util.copy(competition) || {};
    modalRef.result
      .then((competition: Competition) => {
        let index = _.findIndex(this.competitions, {_id: competition._id});
        if (index >= 0) {
          this.competitions.splice(index, 1, competition);
        } else {
          this.competitions.unshift(competition);
        }
      })
      .catch(() => {
      });
  }

  deleteCompetition(competition: Competition): void {
    this.competitionService.deleteCompetition(competition)
      .finally(() => this.isLoading = false)
      .subscribe(() => _.remove(this.competitions, competition));
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
            this.errorMessage = 'Vous êtes déjà inscrit aux nouvelles actualités. Si vous ne recevez aucun mail, regardez dans votre dossier de spam ou contactez le webmaster.';
            break;
          case 401:
            this.errorMessage = 'Votre email ne correspond pas à un email valide (il s\'agit d\'une boîte de réception temporaire).';
            break;
          default:
            this.errorMessage = 'Si vous vous êtes désinscrit par erreur, contactez le webmaster pour vous réinscrire manuellement.';
            break;;
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
