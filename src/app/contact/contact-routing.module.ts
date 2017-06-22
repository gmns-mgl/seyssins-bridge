import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactComponent } from './contact.component';
import {Route} from '../core/route.service';

const routes: Routes = Route.withShell([
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'Contact' }
  }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ContactRoutingModule { }
