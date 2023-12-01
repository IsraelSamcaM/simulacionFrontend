import { Component, HostListener  } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';


@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent {
  panelOpenState = false;
  scrollOffset: number = 0;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any): void {
    this.scrollOffset = window.scrollY;
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
