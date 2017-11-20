import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { QuillModule } from 'ngx-quill';
import { TranslateModule } from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ClublifeService} from './clublife.service';
import {AuthentificationService} from '../core/authentification/authentification.service';

import { SharedModule } from '../shared/shared.module';
import { ClublifeRoutingModule } from './clublife-routing.module';
import {ClublifeComponent, ClublifeModalContent} from './clublife.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    TranslateModule.forChild(),
    SharedModule,
    QuillModule,
    ClublifeRoutingModule
  ],
  declarations: [
    ClublifeComponent,
    ClublifeModalContent
  ],
  entryComponents: [
    ClublifeModalContent
  ],
  providers: [
    ClublifeService,
    AuthentificationService
  ]
})
export class ClublifeModule { }
