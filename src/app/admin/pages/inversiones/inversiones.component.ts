
import { AfterViewInit, Component, ViewChild } from '@angular/core';
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
export class InversionesComponent implements AfterViewInit{
  text: string = ''
  displayedColumns = ['nombreInversion' ,'inicialFijoPesimista','inicialFijoProbable','inicialFijoOptimista','options']
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private InversionesService: InversionesService,
    public dialog: MatDialog,
  ) {
    this.Get()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  Get() {
    this.InversionesService.get().subscribe(data => {
      this.dataSource = new MatTableDataSource(data.inversiones)
      this.dataSource.paginator = this.paginator;
    })    
  }

  applyFilter(event: Event) {
    this.text = (event.target as HTMLInputElement).value;
    this.Get()
  }

  cancelSearch() {
    this.text = ''
    this.Get()
  }

  Edit(item: any) {
    const dialogRef = this.dialog.open(InversionesDialogComponent, {
      width: '800px',
      data: item
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.dataSource.data.findIndex(element => element._id === result._id);
        this.dataSource.data[index] = result
        this.dataSource = new MatTableDataSource(this.dataSource.data)
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  add() {
    const dialogRef = this.dialog.open(InversionesDialogComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dataSource = new MatTableDataSource([result, ...this.dataSource.data])
        this.dataSource.paginator = this.paginator;
      }
    })
  }


  delete(inversion: any) {
    this.InversionesService.delete(inversion._id).subscribe(() => {
      const indexFound = this.dataSource.data.findIndex((element: any) => element._id === inversion._id);
      if (indexFound !== -1) {
        this.dataSource.data.splice(indexFound, 1); 
        this.dataSource = new MatTableDataSource(this.dataSource.data); 
        this.dataSource.paginator = this.paginator; 
      }
    });
  }
}
