import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevresultdetailComponent } from './prevresultdetail.component';

describe('PrevresultdetailComponent', () => {
  let component: PrevresultdetailComponent;
  let fixture: ComponentFixture<PrevresultdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevresultdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevresultdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
