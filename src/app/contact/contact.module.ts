import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';

import { environment } from '../../environments/environment';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ContactRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapAPI
    })
  ],
  declarations: [
    ContactComponent
  ]
})
export class ContactModule { }
