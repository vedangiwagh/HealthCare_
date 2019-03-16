import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptiondetailComponent } from './prescriptiondetail.component';

describe('PrescriptiondetailComponent', () => {
  let component: PrescriptiondetailComponent;
  let fixture: ComponentFixture<PrescriptiondetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptiondetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptiondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
