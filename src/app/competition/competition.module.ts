import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';

import { SharedModule } from '../shared/shared.module';
import { CompetitionRoutingModule } from './competition-routing.module';
import { CompetitionComponent } from './competition.component';
import { CompetitionModalContent } from './competition.modal.component';
import { CompetitionService } from './competition.service';
import {AuthentificationService} from '../core/authentification/authentification.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    TranslateModule.forChild(),
    SharedModule,
    QuillModule,
    CompetitionRoutingModule
  ],
  declarations: [
    CompetitionComponent,
    CompetitionModalContent
  ],
  providers: [
    CompetitionService,
    AuthentificationService
  ]
})
export class CompetitionModule { }
