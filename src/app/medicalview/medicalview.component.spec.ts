import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalviewComponent } from './medicalview.component';

describe('MedicalviewComponent', () => {
  let component: MedicalviewComponent;
  let fixture: ComponentFixture<MedicalviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
