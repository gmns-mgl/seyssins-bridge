import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { CompetitionService, Competition } from './competition.service';
import {AuthentificationService} from '../core/authentification/authentification.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Util} from '../core/util.service';
import {CompetitionModalContent} from './competition.modal.component';

@Component({
  selector: 'app-competition',
  templateUrl: 'competition.component.html',
  styleUrls: ['competition.component.scss']
})
export class CompetitionComponent implements OnInit {


  competitions: Competition[];
  isAuthentificated: boolean = false;
  isLoading: boolean;

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
      .catch(() => {});
  }

  deleteCompetition(competition: Competition): void {
    this.competitionService.deleteCompetition(competition)
      .finally(() => this.isLoading = false)
      .subscribe(() => _.remove(this.competitions, competition));
  }

}
