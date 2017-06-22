import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';

import { ActualityService, Actuality } from './actuality.service';

@Component({
  selector: 'app-home',
  templateUrl: 'actuality.component.html',
  styleUrls: ['actuality.component.scss']
})
export class ActualityComponent implements OnInit {

  actualities: Actuality[];
  isLoading: boolean;

  constructor(private actualityService: ActualityService) {}

  ngOnInit() {
    this.isLoading = true;
    this.actualityService.getActualities({ page: 1, actualityCount: 20 })
      .finally(() => { this.isLoading = false; })
      .subscribe((actualities: Actuality[]) => { this.actualities = actualities; });
  }

}
