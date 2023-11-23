import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacionesComponent } from './simulaciones.component';

describe('SimulacionesComponent', () => {
  let component: SimulacionesComponent;
  let fixture: ComponentFixture<SimulacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulacionesComponent]
    });
    fixture = TestBed.createComponent(SimulacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
