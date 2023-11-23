
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InversionesService } from '../../services/inversiones.service';

@Component({
  selector: 'app-inversiones-dialog',
  templateUrl: './inversiones-dialog.component.html',
  styleUrls: ['./inversiones-dialog.component.css']
})
export class InversionesDialogComponent {

  pesimista: Number = 0
  probable: Number = 0
  optimo: Number = 0
  
  budgetarys: any[] = []
  

  FormInversion: FormGroup = this.fb.group({
    nombreInversion: ['', Validators.required],

    inicialFijoPesimista: ['', Validators.required],
    inicialFijoProbable: ['', Validators.required],
    inicialFijoOptimista: ['', Validators.required],

    inicialCirculantePesimista: ['', Validators.required],
    inicialCirculanteProbable: ['', Validators.required],
    inicialCirculanteOptimista: ['', Validators.required],

    flujoAntesImpuestosPesimista: ['', Validators.required],
    flujoAntesImpuestosProbable: ['', Validators.required],
    flujoAntesImpuestosOptimista: ['', Validators.required],

    tasaInflacionPesimista: ['', Validators.required],
    tasaInflacionProbable: ['', Validators.required],
    tasaInflacionOptimista: ['', Validators.required],

    //sumaTotal: [0, Validators.required]
    //activo: [false, Validators.required],
  }); 
  
  constructor(
    private inversionesServicio: InversionesService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InversionesDialogComponent>,
    
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.FormInversion.patchValue(this.data)
      console.log(this.data)
    }
  }

  guardar() {
    const newInversion = {
      ...this.FormInversion.value,
      
    }

    console.log(newInversion)
    
    if (this.data) {  
      this.inversionesServicio.edit(this.data._id, newInversion).subscribe(data => {
        this.dialogRef.close(data);
      })
    }
    else {
      this.inversionesServicio.add(this.FormInversion.value).subscribe(inversiones => {
        this.dialogRef.close(inversiones)
      })
    }
  }


}
