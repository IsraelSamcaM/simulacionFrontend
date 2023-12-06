import { Component, OnInit,ViewChild, ElementRef,AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {Chart} from 'chart.js/auto';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-simulaciones',
  templateUrl: './simulaciones.component.html',
  styleUrls: ['./simulaciones.component.css']
})
export class SimulacionesComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas: ElementRef;
  displayedColumns = ['numIntervalo' ,'intervaloInferior','intervaloSuperior','frecuencia','porcentaje']
  displayedColumnsAcum = ['numIntervalo' ,'intervaloInferior','intervaloSuperior','frecuencia acumulada','porcentaje']
  dataSource = new MatTableDataSource<any>([]);
  dataSourceAcum = new MatTableDataSource<any>([]);

  FormSimulacion: FormGroup; 

  AFpesismista: number;
  AFprobable: number;
  AFoptimista: number;
  ACpesismista: number;
  ACprobable: number;
  ACoptimista: number;
  FAIpesismista: number;
  FAIprobable: number;
  FAIoptimista: number;
  
  TAIpesismista1: number;
  TAIprobable1:number;
  TAIoptimista1:number;
  TAIpesismista2:number;
  TAIprobable2: number;
  TAIoptimista2: number;
  TAIpesismista3:number;
  TAIprobable3:number;
  TAIoptimista3: number;
  TAIpesismista4: number;
  TAIprobable4:number;
  TAIoptimista4: number;
  TAIpesismista5: number;
  TAIprobable5:number;
  TAIoptimista5: number;

  numeroIteraciones: number;

  TREMA: number;
  alfa: number;
  aprobado: boolean = true;
  simulado: boolean = false;
  
  tasaImpuestos:number;
  TIRminima: number;
  TIRmaxima: number;

  AFsimulado: number;
  ACsimulado: number;
  FAIsimulado: number;

  intervalos: any[]=[];
  acumulados: any[]=[];

  intervalosTIR: number[] = [];
  FAIsimulados: number[] = [];
  
  TAIsimulado1: number;
  TAIsimulado2: number;
  TAIsimulado3: number;
  TAIsimulado4: number;
  TAIsimulado5: number;
  
  TAIsimulados: number[] = [];

  data: number[] = []
  data2: number[] = []
  labels: string[]=[]
  labels2: string[]=[]


  constructor(private fb: FormBuilder) {
    
    this.FormSimulacion = this.fb.group({
    
      AFpesismista: ['-100000', Validators.required],
      AFprobable: ['-70000', Validators.required],
      AFoptimista:['-60000', Validators.required],
    
      ACpesismista:['-40000', Validators.required],
      ACprobable:['-30000', Validators.required],
      ACoptimista: ['-25000', Validators.required],

      FAIpesismista:['30000', Validators.required],
      FAIprobable:['40000', Validators.required],
      FAIoptimista: ['45000', Validators.required],
    
      TAIpesismista1:['0.18', Validators.required],
      TAIprobable1: ['0.15', Validators.required],
      TAIoptimista1:  ['0.12', Validators.required],

      TAIpesismista2:['0.18', Validators.required],
      TAIprobable2: ['0.15', Validators.required],
      TAIoptimista2:  ['0.12', Validators.required],

      TAIpesismista3:['0.22', Validators.required],
      TAIprobable3: ['0.18', Validators.required],
      TAIoptimista3:  ['0.15', Validators.required],

      TAIpesismista4:['0.25', Validators.required],
      TAIprobable4: ['0.20', Validators.required],
      TAIoptimista4:  ['0.18', Validators.required],

      TAIpesismista5:['0.28', Validators.required],
      TAIprobable5: ['0.22', Validators.required],
      TAIoptimista5:  ['0.19', Validators.required],

      cantidadIteraciones:['1000', Validators.required],
      tasaImpuestos:['0.5', Validators.required],
      TREMA:['0.15', Validators.required],
      alfa:['0.9', Validators.required],

      TIRmaxima: [''],
      TIRminima: [''],
    });
  }

  public chart: Chart;

  ngOnInit(): void{
    
  }

  ngAfterViewInit() {
    const chartCanvas = this.chartCanvas.nativeElement;
  }

  graficar(generarPDFAutomatically: boolean = false) {
    if (this.chart) {
      this.chart.destroy();
    }
    const data = {
      labels: this.labels2,
      datasets: [{
        label: 'Porcentaje de TIRs simulados por intervalos',
        data: this.data,
        fill: false,
        borderColor: 'rgb(17, 255, 54)',
        tension: 0.1
      },
      {
        label: 'Porcentaje de TIRs simulados acumulados',
        data: this.data2,
        fill: false,
        borderColor: 'rgb(214, 17, 255)',
        tension: 0.1
      },
      ]
    };
  
    this.chart = new Chart("chart2", {
      type: 'line',
      data,
      options: {
        animation: {
          onComplete: () => {
            if (generarPDFAutomatically) {
              this.pdfGenerar();
            }
          }
        }
      }
    });
  }

   

  obtenerDatos() {
      this.ACoptimista = this.FormSimulacion.get('ACoptimista')?.value || '';
      this.ACpesismista = this.FormSimulacion.get('ACpesismista')?.value || '';
      this.ACprobable = this.FormSimulacion.get('ACprobable')?.value || '';

      this.AFoptimista = this.FormSimulacion.get('AFoptimista')?.value || '';
      this.AFpesismista = this.FormSimulacion.get('AFpesismista')?.value || '';
      this.AFprobable = this.FormSimulacion.get('AFprobable')?.value || '';

      this.FAIoptimista = this.FormSimulacion.get('FAIoptimista')?.value || '';
      this.FAIpesismista = this.FormSimulacion.get('FAIpesismista')?.value || '';
      this.FAIprobable = this.FormSimulacion.get('FAIprobable')?.value || '';

      this.TAIoptimista1 = this.FormSimulacion.get('TAIoptimista1')?.value || '';
      this.TAIpesismista1 = this.FormSimulacion.get('TAIpesismista1')?.value || '';
      this.TAIprobable1 = this.FormSimulacion.get('TAIprobable1')?.value || '';

      this.TAIoptimista2 = this.FormSimulacion.get('TAIoptimista2')?.value || '';
      this.TAIpesismista2 = this.FormSimulacion.get('TAIpesismista2')?.value || '';
      this.TAIprobable2 = this.FormSimulacion.get('TAIprobable2')?.value || '';

      this.TAIoptimista3 = this.FormSimulacion.get('TAIoptimista3')?.value || '';
      this.TAIpesismista3 = this.FormSimulacion.get('TAIpesismista3')?.value || '';
      this.TAIprobable3 = this.FormSimulacion.get('TAIprobable3')?.value || '';

      this.TAIoptimista4 = this.FormSimulacion.get('TAIoptimista4')?.value || '';
      this.TAIpesismista4 = this.FormSimulacion.get('TAIpesismista4')?.value || '';
      this.TAIprobable4 = this.FormSimulacion.get('TAIprobable4')?.value || '';

      this.TAIoptimista5 = this.FormSimulacion.get('TAIoptimista5')?.value || '';
      this.TAIpesismista5 = this.FormSimulacion.get('TAIpesismista5')?.value || '';
      this.TAIprobable5 = this.FormSimulacion.get('TAIprobable5')?.value || '';

      for (let i = 1; i <= 5; i++) {
        const pesimista = this.FormSimulacion.get(`TAIpesismista${i}`)?.value;
        const probable = this.FormSimulacion.get(`TAIprobable${i}`)?.value;
        const optimista = this.FormSimulacion.get(`TAIoptimista${i}`)?.value;
        const valorSimulado = this.simularTriangular(pesimista, probable, optimista);
        this.TAIsimulados.push(valorSimulado);
      }
      for(let i=0;i<5;i++){
        const pesimista = this.FormSimulacion.get(`FAIpesismista`)?.value;
        const probable = this.FormSimulacion.get(`FAIprobable`)?.value;
        const optimista = this.FormSimulacion.get(`FAIoptimista`)?.value;
        const TAIsimulado = this.simularTriangular(pesimista,probable,optimista);
        this.FAIsimulados.push(TAIsimulado);
      }
      this.numeroIteraciones = this.FormSimulacion.get('cantidadIteraciones')?.value || '';
      this.tasaImpuestos = this.FormSimulacion.get('tasaImpuestos')?.value || '';
      this.TREMA = this.FormSimulacion.get('TREMA')?.value || '';
      this.alfa = this.FormSimulacion.get('alfa')?.value || '';
      //console.log(this.FAIsimulados)
  }
  
  // pesismista a
  // mas probable b
  // optimista c
  simularTriangular(a: number, b: number, c: number): number {
    const menor = Math.min(a, b, c);
    const mayor = Math.max(a, b, c);
    a = menor;
    c = mayor;
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

  actualizarSimulados(){
    this.AFsimulado = this.simularTriangular(this.AFpesismista,this.AFprobable,this.AFoptimista) 
    this.ACsimulado = this.simularTriangular(this.AFpesismista,this.AFprobable,this.AFoptimista) 
    
    this.TAIsimulados= []
    this.FAIsimulados= []

    for (let i = 1; i <= 5; i++) {
      const pesimista = this.FormSimulacion.get(`TAIpesismista${i}`)?.value;
      const probable = this.FormSimulacion.get(`TAIprobable${i}`)?.value;
      const optimista = this.FormSimulacion.get(`TAIoptimista${i}`)?.value;
      const valorSimulado = this.simularTriangular(pesimista, probable, optimista);
      this.TAIsimulados.push(valorSimulado);
    }
    for(let i=0;i<5;i++){
      const pesimista = this.FormSimulacion.get(`FAIpesismista`)?.value;
      const probable = this.FormSimulacion.get(`FAIprobable`)?.value;
      const optimista = this.FormSimulacion.get(`FAIoptimista`)?.value;
      const TAIsimulado = this.simularTriangular(pesimista,probable,optimista);
      this.FAIsimulados.push(TAIsimulado);
    }
  }

  simular(){
      this.simulado = true
      this.labels=[]
      this.data=[]
      this.data2=[]

      this.numeroIteraciones = this.FormSimulacion.get('cantidadIteraciones')?.value || '';
      this.tasaImpuestos = this.FormSimulacion.get('tasaImpuestos')?.value || '';
      
      this.intervalos=[]
      this.acumulados=[]

      const frecuenciaPorIntervalo: number[] = new Array(20).fill(0);

      let TIRsimuladas: number[] = new Array(this.numeroIteraciones)
      let numInteracion: number = 0

      for (let i = 0; i < this.numeroIteraciones; i++) {
        let simulado: number = this.iterar(this.AFsimulado, this.ACsimulado, this.FAIsimulados, this.TAIsimulados,
        this.tasaImpuestos, this.TIRminima, this.TIRmaxima);
        if(simulado>this.TIRminima && simulado < this.TIRmaxima){
          TIRsimuladas[i] = simulado; 
        }
        this.actualizarSimulados();
        this.clasificarTIR(frecuenciaPorIntervalo, this.intervalosTIR, TIRsimuladas[i]);
      }


      let frecuenciaAcumulada: number[] = new Array(20);
      for (let i = 0; i < 20; i++) {
          if (i === 0) {
              frecuenciaAcumulada[i] = frecuenciaPorIntervalo[i];
          } else {
              frecuenciaAcumulada[i] = frecuenciaAcumulada[i - 1] + frecuenciaPorIntervalo[i];
          }
      }

      for (let i = 0; i < 20; i++) {
          const porcentaje: number = (frecuenciaPorIntervalo[i] / this.numeroIteraciones) * 100;
          numInteracion++
          const intervaloObj = {
            numIntervalo: numInteracion,
            intervaloInferior: this.intervalosTIR[i],
            intervaloSuperior: this.intervalosTIR[i + 1],
            frecuencia: frecuenciaPorIntervalo[i],
            porcentaje: porcentaje
          };
          this.intervalos.push(intervaloObj);
          this.labels.push("Intervalo "+intervaloObj.numIntervalo.toString());
          this.data.push(intervaloObj.porcentaje);
          
      }
      numInteracion = 0
      for (let i = 0; i < 20; i++) {
        const porcentaje: number = (frecuenciaAcumulada[i] / this.numeroIteraciones) * 100;
        numInteracion++;
        const frecuenciaAcumuladaActual = i === 0 ? frecuenciaPorIntervalo[i] : frecuenciaPorIntervalo.slice(0, i + 1).reduce((a, b) => a + b, 0);
  
        const acumuladoObj = {
            numIntervalo: numInteracion,
            intervaloInferior: this.intervalosTIR[i],
            intervaloSuperior: this.intervalosTIR[i + 1],
            frecuencia: frecuenciaAcumuladaActual,
            porcentaje: porcentaje
        };
        // console.log(
        //     `En el intervalo: ${acumuladoObj.intervaloInferior} a ${acumuladoObj.intervaloSuperior}, la acumulada es: ${acumuladoObj.frecuencia}, es decir un ${acumuladoObj.porcentaje}% de las TIR.`
        // )
        this.acumulados.push(acumuladoObj);
        this.data2.push(acumuladoObj.porcentaje);
      }
      console.log(this.acumulados)

      if (this.TIRminima >= this.TREMA) {
        this.aprobado = true;
        console.log("El proyecto se aprueba, la TIR siempre supera a la TREMA");
      } else if (this.TIRmaxima > this.TREMA) {
          this.aprobado = true;
          for (let i = 0; this.intervalosTIR[i] < this.TREMA; i++) {
              if ((frecuenciaAcumulada[i] / this.numeroIteraciones) > (1 - this.alfa)) {
                this.aprobado = false;
              }
          }
          if (this.aprobado) {
              console.log("El proyecto se aprueba, la TIR es superior a la TREMA más del 90% de las veces.");
          } else {
              console.log("El proyecto se rechaza, la TIR es inferior a la TREMA más del 90% de las veces.");
          }
      } else {
          console.log("El proyecto se rechaza, la TIR nunca alcanza a la TREMA");
      }

      console.log(this.intervalos)
      console.log(this.acumulados)
      this.dataSource = new MatTableDataSource(this.intervalos) 
      this.dataSourceAcum= new MatTableDataSource(this.acumulados) 
      //console.log("Todos los tir simulados: ");
      //console.log(TIRsimuladas) 
      //console.log(this.intervalos)  
      if (this.chart) {
        this.chart.destroy();
      }
      this.llenarLabels(3);
      console.log(this.labels2)
      this.graficar(false) 
      //this.pdfGenerar()   
      //console.log(this.intervalosTIR)
  }

  iterar(estAF: number, estAC: number, estFAI: number[], estInfSimulados: number[], TasaImpuestos: number, TIRminima: number, TIRmaxima: number): number {
    const AF: number = estAF;
    const AC: number = estAC;
    const FAI: number[] = estFAI;
    const Inf: number[] = [...estInfSimulados];  
   
    const FDI: number[] = new Array(5);

    for (let i = 0; i < 5; i++) {
        FDI[i] = this.calcularFDI(i + 1, FAI[i], Inf, TasaImpuestos, AF, AC);
    }

    const VR: number = -1 * (Number(AC) + Number(0.2) * Number(AF) * (1 - TasaImpuestos));

    const intervalosTIR: number[] = this.calcularIntervalosTIR(TIRminima, TIRmaxima, 100);
    let TIR0: number = 0;
    for (let i = 0; i < intervalosTIR.length - 1; i++) {
        const VPN_inferior = this.calcularVPN(FDI, AF, AC, VR, intervalosTIR[i]);
        const VPN_superior = this.calcularVPN(FDI, AF, AC, VR, intervalosTIR[i + 1]);
        if ((VPN_inferior <= 0 && VPN_superior >= 0) || (VPN_inferior >= 0 && VPN_superior <= 0)) {
            TIR0 = this.interpolarLinealA0(intervalosTIR[i], intervalosTIR[i + 1], VPN_inferior, VPN_superior);
            break;  
        }
    }
    return TIR0;
}


  calcularValoresSimulados(){
    this.aprobado = false
    this.TAIsimulados = []
    
    this.obtenerDatos();

    this.AFsimulado = this.simularTriangular(this.AFpesismista, this.AFprobable,this.AFoptimista);
    console.log(this.AFpesismista, this.AFprobable,this.AFoptimista)
    this.ACsimulado = this.simularTriangular(this.ACpesismista , this.ACprobable,this.ACoptimista);
    this.FAIsimulado = this.simularTriangular(this.FAIpesismista , this.FAIprobable,this.FAIoptimista);
   
    this.calcularTirs()
  }

  calcularFDI(periodo: number, FAI: number, Inf: number[], T: number, AF: number, AC: number): number {
    const productoriaGral: number = this.calcularProductoriaInflacion(1, periodo, Inf);
    let productoriaAC: number = 0;
    if (periodo > 1) {
        productoriaAC = this.calcularProductoriaInflacion(2, periodo, Inf);
    }
    return (((Number(FAI)) * (productoriaGral) * (1 - Number(T))) + ((0.2 * Number(-AF)) * (Number(T)))
        - ((Number(-AC) * Number(Inf[(periodo - 1)])) * (Number(productoriaAC)))) / (Number(productoriaGral));
  }

  calcularProductoriaInflacion(periodoInicio: number, cantidadPeriodos: number, Inf: number[]): number {
    let producto: number = 1;
    for (let i = (periodoInicio - 1); i < cantidadPeriodos; i++) {
        producto = producto * (1 + Inf[i]);
    }
    return producto;
  }

  interpolarLinealA0(TIRinferior: number, TIRsuperior: number, VPNinferior: number, VPNsuperior: number): number {
    let TIR0: number = (((-Number(VPNinferior)) * ((Number(TIRsuperior) - Number(TIRinferior)) / (Number(VPNsuperior) - Number(VPNinferior)))) + Number(TIRinferior));
    return TIR0;
  }

  calcularIntervalosTIR(TIRminima: number, TIRmaxima: number, numeroIntervalos: number): number[] {
    const intervalos: number[] = new Array<number>(numeroIntervalos + 1);
    const intervalo: number = (TIRmaxima - TIRminima) / numeroIntervalos;
    for (let i = 0; i < (numeroIntervalos + 1); i++) {
        intervalos[i] = TIRmaxima - i * intervalo;
    }
    return intervalos;
  }

  clasificarTIR(frecuenciaPorIntervalo: number[], intervalosTIR: number[], TIRaClasificar: number): number[] {
    let posicion: number = 0;
    while (TIRaClasificar > intervalosTIR[posicion + 1]) {
        posicion++;
    }
    frecuenciaPorIntervalo[posicion]++;
    return frecuenciaPorIntervalo;
  }

  calcularTIRextrema(AF: number, AC: number, FAI: number, Inf1: number, Inf2: number, Inf3: number, Inf4: number, Inf5: number, TasaImpuestos: number): number {
    let TIRextrema: number = 0;
    let Inf: number[] = [Inf1, Inf2, Inf3, Inf4, Inf5];
    let FDI: number[] = new Array(5);

    for (let i = 0; i < 5; i++) {
        FDI[i] = this.calcularFDI(i + 1, FAI, Inf, TasaImpuestos, AF, AC);
    }

    let VR: number = -1 * (Number(AC) + 0.2 * Number(AF) * (1 - Number(TasaImpuestos)));

    console.log("VR es:" + VR);

    if (this.calcularVPN(FDI, AF, AC, VR, TIRextrema) > 0) {
        for (let i = 0; this.calcularVPN(FDI, AF, AC, VR, TIRextrema) > 0; i++) {
            TIRextrema = TIRextrema + Number(0.0001);
        }
    } else if (this.calcularVPN(FDI, AF, AC, VR, TIRextrema) < 0) {
        for (let i = 0; this.calcularVPN(FDI, AF, AC, VR, TIRextrema) < 0; i++) {
            TIRextrema = TIRextrema - Number(0.0001);
        }
    }
    return TIRextrema;
  } 

  calcularVPN(FDI: number[], AF: number, AC: number, VR: number, TIR: number): number {
      let sumatoria: number = 0;
      for (let i = 0; i < 5; i++) {
          sumatoria = Number(sumatoria) + Number((FDI[i] / Math.pow((1 + Number(TIR)), (i + 1))));
      }
      sumatoria = Number(sumatoria) + Number(VR)/ Math.pow((1 + Number(TIR)), 5);
      return sumatoria + Number(AC) + Number(AF);
  }


  calcularTirs(){

      this.TIRminima = this.calcularTIRextrema(this.AFpesismista, this.ACpesismista,this.FAIpesismista,
        this.TAIpesismista1,this.TAIpesismista2,this.TAIpesismista3,this.TAIpesismista4,this.TAIpesismista5,        
        this.tasaImpuestos)

    this.TIRmaxima = this.calcularTIRextrema(this.AFoptimista, this.ACoptimista,this.FAIoptimista,
      this.TAIoptimista1,this.TAIoptimista2,this.TAIoptimista3,this.TAIoptimista4,this.TAIoptimista5,       
        this.tasaImpuestos)

        console.log("la tir maxima es:"+this.TIRminima)
        console.log("la tir minima es:"+this.TIRmaxima)
    
    this.FormSimulacion.patchValue({'TIRminima': this.TIRminima});
    this.FormSimulacion.patchValue({'TIRmaxima': this.TIRmaxima});

    const estaLleno = this.intervalosTIR.length>0
        if(estaLleno){
          this.intervalosTIR = []
          this,this.intervalosTIR = this.calcularIntervalosTIR(this.TIRmaxima, this.TIRminima,20)
        }else{
          this,this.intervalosTIR = this.calcularIntervalosTIR(this.TIRmaxima, this.TIRminima,20)
        }
        //console.log(this.intervalosTIR)
  }

  llenarLabels(decimales: number): void {
    this.labels2 = [
      `[${this.intervalosTIR[0].toFixed(decimales)}, ${
        this.intervalosTIR[1].toFixed(decimales)
      }]`,
    ];
    for (let i = 1; i < this.intervalosTIR.length - 1; i++) {
      this.labels2.push(`[${this.intervalosTIR[i].toFixed(decimales)}, ${
        this.intervalosTIR[i + 1].toFixed(decimales)
      }]`);
    }
  }
  

  
  
pdfGenerar() {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 255); 
  doc.text('REPORTE DE SIMULACIÓN DE PROYECTO DE INVERSIÓN', 16, 22);

  const fechaCreacion = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.setTextColor(0); 
  doc.text(`Creado: ${fechaCreacion}`, 170, 10); 

 
  autoTable(doc, {
    theme: 'striped',
    head: [['Parametros de entrada utizados:']],
    startY: 30,
  })

  autoTable(doc, {
    theme: 'grid',
    head: [['Variable','Estimación pesimista', 'Estimación probable', 'Estimación optimista']],
    body: [
      ['Activo fijo inicial',this.AFpesismista, this.AFprobable, this.AFoptimista],
      ['Activo circulante inicial',this.ACpesismista, this.ACprobable, this.ACoptimista],
      ['Flujo antes de impuestos',this.FAIpesismista, this.FAIprobable, this.FAIoptimista],
    ],
  })

  autoTable(doc, {
    theme: 'striped',
    head: [['Parametros de tasa de inflación utilizados']],
  })
  autoTable(doc, {
    theme: 'grid',
    head: [['Año','Estimación pesimista', 'Estimación probable', 'Estimación optimista']],
    body: [
      ['1',this.TAIpesismista1, this.TAIprobable1, this.TAIoptimista1],
      ['2',this.TAIpesismista2, this.TAIprobable2, this.TAIoptimista2],
      ['3',this.TAIpesismista3, this.TAIprobable3, this.TAIoptimista3],
      ['4',this.TAIpesismista4, this.TAIprobable4, this.TAIoptimista4],
      ['5',this.TAIpesismista5, this.TAIprobable5, this.TAIoptimista5],
    ],
  })

  autoTable(doc, {
    theme: 'plain',
    head: [['TIR extremos calculados:']],
  })
  
  autoTable(doc, {
    theme: 'grid',
    head: [[ 'TIR maxima', 'TIR minima']],
    body: [
      [ this.TIRmaxima, this.TIRminima],
      
    ],
  })
  autoTable(doc, {
    theme: 'striped',
    head: [['Parametros de entrada extras utlizados:']],
  })
  autoTable(doc, {
    theme: 'grid',
    head: [['Cantidad de interaciones','% Impuestos', 'TREMA', 'Alfa']],
    body: [
      [this.numeroIteraciones,this.tasaImpuestos, this.TREMA, this.alfa],
      
    ],
  })

  autoTable(doc, {
    theme: 'plain',
    head: [['Tabla de TIR Simulados por Intervalos:']],
  })

  const intervalos = this.intervalos;
  const tableData1 = [];
  tableData1.push(['Número de Intervalo', 'Intervalo Inferior', 'Intervalo Superior', 'Frecuencia', 'Porcentaje']);
  intervalos.forEach(intervalo => {
    tableData1.push([
      intervalo.numIntervalo,
      intervalo.intervaloInferior,
      intervalo.intervaloSuperior,
      intervalo.frecuencia,
      intervalo.porcentaje
    ]);
  });
  autoTable(doc, {
    head: tableData1.slice(0, 1),
    body: tableData1.slice(1),
  });


  autoTable(doc, {
    theme: 'plain',
    head: [['Tabla de TIR acumulada simulados:']],
  })
  
  const acumulados = this.acumulados;
  const tableData2 = [];
  
  tableData2.push(['Número de Intervalo', 'Intervalo Inferior', 'Intervalo Superior', 'Frecuencia acumulada', 'Porcentaje acumulado']);
  acumulados.forEach(acumulado => {
    tableData2.push([
      acumulado.numIntervalo,
      acumulado.intervaloInferior,
      acumulado.intervaloSuperior,
      acumulado.frecuencia,
      acumulado.porcentaje
    ]);
  });
  autoTable(doc, {
    head: tableData2.slice(0, 1),
    body: tableData2.slice(1),
  });

  autoTable(doc, {
    theme: 'striped',
    head: [['Grafico resultante de la simulacion realizada:']],
  })

  const chartCanvas = this.chartCanvas.nativeElement;
  const chartImage = chartCanvas.toDataURL('image/png');
  doc.addImage(chartImage, 'png', 10, 100, 190, 80); 
  

  
  const mensaje = this.aprobado ? 'PROYECTO DE INVERSIÓN APROBADO' : 'PROYECTO DE INVERSIÓN NO APROBADO';
  const colorMensaje = this.aprobado ? {r: 0, g: 128, b: 0} : {r: 255, g: 0, b: 0}; // Verde si aprobado, rojo si no aprobado
  doc.setFontSize(16);
  doc.setTextColor(colorMensaje.r, colorMensaje.g, colorMensaje.b);
  doc.text(mensaje, 50, 200);

  
    
  doc.save(`SimulationReport${fechaCreacion}.pdf`);
}

  
}
