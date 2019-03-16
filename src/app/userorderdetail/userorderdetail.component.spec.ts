import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserorderdetailComponent } from './userorderdetail.component';

describe('UserorderdetailComponent', () => {
  let component: UserorderdetailComponent;
  let fixture: ComponentFixture<UserorderdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserorderdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserorderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
