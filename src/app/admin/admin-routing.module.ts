import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InversionesComponent } from './pages/inversiones/inversiones.component';
import {  SimulacionesComponent } from './pages/simulaciones/simulaciones.component';



const routes: Routes = [
  { path: 'inversiones', component: InversionesComponent },
  { path: 'simulaciones', component: SimulacionesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

