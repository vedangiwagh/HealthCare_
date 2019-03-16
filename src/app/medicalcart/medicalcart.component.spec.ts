import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalcartComponent } from './medicalcart.component';

describe('MedicalcartComponent', () => {
  let component: MedicalcartComponent;
  let fixture: ComponentFixture<MedicalcartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalcartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
