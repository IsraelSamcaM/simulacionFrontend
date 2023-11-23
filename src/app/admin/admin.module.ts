import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { InversionesComponent } from './pages/inversiones/inversiones.component';
import { InversionesDialogComponent } from './dialogs/inversiones-dialog/inversiones-dialog.component';
import { SimulacionesComponent } from './pages/simulaciones/simulaciones.component';




@NgModule({
  declarations: [
    InversionesComponent,
    InversionesDialogComponent,
    SimulacionesComponent,

     
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGraphModule
  ]
})
export class AdminModule { }
