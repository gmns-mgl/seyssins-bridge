import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../shared/shared.module';
import { ActualityComponent } from './actuality.component';
import { ActualityService } from './actuality.service';
import { ActualityRoutingModule } from './actuality-routing.module';
import {AuthentificationService} from '../core/authentification/authentification.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    TranslateModule.forChild(),
    SharedModule,
    ActualityRoutingModule
  ],
  declarations: [
    ActualityComponent
  ],
  providers: [
    ActualityService,
    AuthentificationService
  ]
})
export class ActualityModule { }
