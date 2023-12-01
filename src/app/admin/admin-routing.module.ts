import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InversionesComponent } from './pages/inversiones/inversiones.component';
import { SimulacionesComponent } from './pages/simulaciones/simulaciones.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';



const routes: Routes = [
  { path: 'sobre_nosotros', component: InversionesComponent },
  { path: 'simulaciones', component: SimulacionesComponent },
  { path: 'ayuda', component: AyudaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

