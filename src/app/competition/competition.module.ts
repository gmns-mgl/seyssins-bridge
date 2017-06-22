import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../shared/shared.module';
import { CompetitionRoutingModule } from './competition-routing.module';
import { CompetitionComponent } from './competition.component';
import { QuoteService } from './quote.service';

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
    QuoteService
  ]
})
export class CompetitionModule { }
