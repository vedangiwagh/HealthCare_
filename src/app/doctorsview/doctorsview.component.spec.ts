import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsviewComponent } from './doctorsview.component';

describe('DoctorsviewComponent', () => {
  let component: DoctorsviewComponent;
  let fixture: ComponentFixture<DoctorsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
