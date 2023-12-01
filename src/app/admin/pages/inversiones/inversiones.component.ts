
import { AfterViewInit, Component, ViewChild,HostListener } from '@angular/core';
import { InversionesService} from '../../services/inversiones.service';
import { MatDialog } from '@angular/material/dialog';
import { InversionesDialogComponent } from '../../dialogs/inversiones-dialog/inversiones-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-inversiones',
  templateUrl: './inversiones.component.html',
  styleUrls: ['./inversiones.component.css']
})
export class InversionesComponent{ panelOpenState = false;
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
