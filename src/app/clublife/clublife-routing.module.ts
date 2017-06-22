import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClublifeComponent } from './clublife.component';
import {Route} from '../core/route.service';

const routes: Routes = Route.withShell([
  {
    path: 'clublife',
    component: ClublifeComponent,
    data: { title: 'Vie du club' }
  }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ClublifeRoutingModule { }
