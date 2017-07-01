import 'rxjs/add/operator/finally';

import {Component, OnInit} from '@angular/core';

import {ActualityService, Actuality} from './actuality.service';
import {AuthentificationService} from '../core/authentification/authentification.service';

@Component({
  selector: 'app-home',
  templateUrl: 'actuality.component.html',
  styleUrls: ['actuality.component.scss']
})
export class ActualityComponent implements OnInit {

  actualities: Actuality[];
  isAuthentificated: boolean = false;
  isLoading: boolean;

  constructor(private actualityService: ActualityService,
              private authentificationService: AuthentificationService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.authentificationService.isAuthentificated()
      .then((isAuthentificated: boolean) => {
        this.isAuthentificated = isAuthentificated;
      });
    this.actualityService.getActualities({page: 1, actualityCount: 20})
      .finally(() => {
        this.isLoading = false;
      })
      .subscribe((actualities: Actuality[]) => {
        this.actualities = actualities;
      });
  }

  addActuality(): void {

  }

}
