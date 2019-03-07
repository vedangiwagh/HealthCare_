import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicaldetailComponent } from './medicaldetail.component';

describe('MedicaldetailComponent', () => {
  let component: MedicaldetailComponent;
  let fixture: ComponentFixture<MedicaldetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicaldetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicaldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
