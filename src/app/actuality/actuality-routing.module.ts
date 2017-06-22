import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualityComponent } from './actuality.component';
import {Route} from '../core/route.service';

const routes: Routes = Route.withShell([
  {
    path: '',
    redirectTo: 'actuality',
    pathMatch: 'full'
  },
  {
    path: 'actuality',
    component: ActualityComponent,
    data: { title: 'Actualités' }
  }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ActualityRoutingModule { }
