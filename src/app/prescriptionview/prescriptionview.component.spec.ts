import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionviewComponent } from './prescriptionview.component';

describe('PrescriptionviewComponent', () => {
  let component: PrescriptionviewComponent;
  let fixture: ComponentFixture<PrescriptionviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
