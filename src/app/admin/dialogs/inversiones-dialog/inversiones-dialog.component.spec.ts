import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InversionesDialogComponent } from './inversiones-dialog.component';

describe('InversionesDialogComponent', () => {
  let component: InversionesDialogComponent;
  let fixture: ComponentFixture<InversionesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InversionesDialogComponent]
    });
    fixture = TestBed.createComponent(InversionesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
