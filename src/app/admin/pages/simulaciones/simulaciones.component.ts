import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';

@Component({
  selector: 'app-simulaciones',
  templateUrl: './simulaciones.component.html',
  styleUrls: ['./simulaciones.component.css']
})
export class SimulacionesComponent implements OnInit {
  FormSimulacion: FormGroup;

  AFpesismista: number;
  AFprobable: number;
  AFoptimista: number;

  ACpesismista: number;
  ACprobable: number;
  ACoptimista: number;

  TAIsimulado1: number;
  TAIsimulado2: number;
  TAIsimulado3: number;
  TAIsimulado4: number;
  TAIsimulado5: number;

  AFsimulado: number;
  ACsimulado: number;
  
  TAIsimulados: number[] = [];

  tasaImpuestos:number = 0.5;

  constructor(private fb: FormBuilder) {
    
    this.FormSimulacion = this.fb.group({
    
      AFpesismista: ['-100000', Validators.required],
      AFprobable: ['-80000', Validators.required],
      AFoptimista:['-60000', Validators.required],
    
      ACpesismista:['1', Validators.required],
      ACprobable:['1', Validators.required],
      ACoptimista: ['1', Validators.required],
    
      TAIpesismista1:['1', Validators.required],
      TAIprobable1: ['1', Validators.required],
      TAIoptimista1:  ['1', Validators.required],

      TAIpesismista2:['1', Validators.required],
      TAIprobable2: ['1', Validators.required],
      TAIoptimista2:  ['1', Validators.required],

      TAIpesismista3:['1', Validators.required],
      TAIprobable3: ['1', Validators.required],
      TAIoptimista3:  ['1', Validators.required],

      TAIpesismista4:['1', Validators.required],
      TAIprobable4: ['1', Validators.required],
      TAIoptimista4:  ['1', Validators.required],

      TAIpesismista5:['1', Validators.required],
      TAIprobable5: ['1', Validators.required],
      TAIoptimista5:  ['1', Validators.required],


      AFsimulado: [''],
      ACsimulado: [''],

      TAIsimulado1: [''],
      TAIsimulado2: [''],
      TAIsimulado3: [''],
      TAIsimulado4: [''],
      TAIsimulado5: [''],
    });
  }

  ngOnInit() {
    
  }

  obtenerDatos() {
      this.ACoptimista = this.FormSimulacion.get('ACoptimista')?.value || '';
      this.ACpesismista = this.FormSimulacion.get('ACpesismista')?.value || '';
      this.ACprobable = this.FormSimulacion.get('ACprobable')?.value || '';

      this.AFoptimista = this.FormSimulacion.get('AFoptimista')?.value || '';
      this.AFpesismista = this.FormSimulacion.get('AFpesismista')?.value || '';
      this.AFprobable = this.FormSimulacion.get('AFprobable')?.value || '';

      for (let i = 1; i <= 5; i++) {
        const pesimista = this.FormSimulacion.get(`TAIpesismista${i}`)?.value;
        const probable = this.FormSimulacion.get(`TAIprobable${i}`)?.value;
        const optimista = this.FormSimulacion.get(`TAIoptimista${i}`)?.value;
      
        const valorSimulado = this.simularTriangular(pesimista, probable, optimista);
      
        this.TAIsimulados.push(valorSimulado);
        console.log(this.TAIsimulados)
      }
  }
  
  // pesismista a
  // mas probable b
  // optimista c
  simularTriangular(a: number, b: number, c: number): number {
    if (c === a) {
        return a;
    }
    let resultado: number;
    do {
        const U: number = Math.random();
        const F: number = (c - a) / (b - a);

        if (U <= F) {
            resultado = a + Math.sqrt(U * (b - a) * (c - a));
        } else {
            resultado = c - Math.sqrt((1 - U) * (c - a) * (c - b));
        }
    } while (resultado < a || resultado > c);
    return resultado;
}



  calcularValoresSimulados(){
    this.TAIsimulados = []
    
    this.obtenerDatos();

    this.AFsimulado = this.simularTriangular(this.AFpesismista, this.AFprobable,this.AFoptimista);
    console.log(this.AFpesismista, this.AFprobable,this.AFoptimista)
    this.ACsimulado = this.simularTriangular(this.ACpesismista , this.ACprobable,this.ACoptimista);
   

    this.FormSimulacion.patchValue({'AFsimulado': this.AFsimulado});
    this.FormSimulacion.patchValue({'ACsimulado': this.ACsimulado});

    for (let i = 0; i < this.TAIsimulados.length; i++) {
      const controlName = 'TAIsimulado' + (i + 1);
      const controlValue = this.TAIsimulados[i];
      this.FormSimulacion.patchValue({
        [controlName]: controlValue
      });
    }
    console.log(this.TAIsimulados)
  }

  


}
