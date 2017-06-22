import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompetitionComponent } from './competition.component';
import {Route} from '../core/route.service';

const routes: Routes = Route.withShell([
  {
    path: 'competition',
    component: CompetitionComponent,
    data: { title: 'Compétitions' }
  }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CompetitionRoutingModule { }
