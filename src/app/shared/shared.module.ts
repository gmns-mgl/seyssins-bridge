import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import {SafeHtmlPipe} from './pipes/safehtml.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    SafeHtmlPipe
  ],
  exports: [
    LoaderComponent,
    SafeHtmlPipe
  ],
})
export class SharedModule { }
