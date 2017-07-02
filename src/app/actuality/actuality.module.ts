import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';

import { SharedModule } from '../shared/shared.module';
import {ActualityComponent, ActualityModalContent} from './actuality.component';
import { ActualityService } from './actuality.service';
import { ActualityRoutingModule } from './actuality-routing.module';
import {AuthentificationService} from '../core/authentification/authentification.service';
import {SafeHtmlPipe} from "../shared/pipes/safehtml.pipe";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    TranslateModule.forChild(),
    SharedModule,
    QuillModule,
    ActualityRoutingModule
  ],
  declarations: [
    ActualityComponent,
    SafeHtmlPipe,
    ActualityModalContent
  ],
  entryComponents: [
    ActualityModalContent
  ],
  providers: [
    ActualityService,
    AuthentificationService
  ]
})
export class ActualityModule { }
