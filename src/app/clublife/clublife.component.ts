import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'clublife.component.html',
  styleUrls: ['clublife.component.scss']
})
export class ClublifeComponent implements OnInit {

  quote: string;
  isLoading: boolean;

  constructor() {}

  ngOnInit() {
    this.isLoading = true;
  }

}
