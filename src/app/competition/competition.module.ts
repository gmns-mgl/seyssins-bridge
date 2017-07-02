import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../shared/shared.module';
import { CompetitionRoutingModule } from './competition-routing.module';
import { CompetitionComponent } from './competition.component';
import { CompetitionService } from './competition.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    TranslateModule.forChild(),
    SharedModule,
    CompetitionRoutingModule
  ],
  declarations: [
    CompetitionComponent
  ],
  providers: [
    CompetitionService
  ]
})
export class CompetitionModule { }
