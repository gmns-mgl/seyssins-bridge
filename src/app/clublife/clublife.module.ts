import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../shared/shared.module';
import { ClublifeRoutingModule } from './clublife-routing.module';
import { ClublifeComponent } from './clublife.component';
import { QuoteService } from './quote.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    TranslateModule.forChild(),
    SharedModule,
    ClublifeRoutingModule
  ],
  declarations: [
    ClublifeComponent
  ],
  providers: [
    QuoteService
  ]
})
export class ClublifeModule { }