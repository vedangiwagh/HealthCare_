import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevprescriptionsComponent } from './prevprescriptions.component';

describe('PrevprescriptionsComponent', () => {
  let component: PrevprescriptionsComponent;
  let fixture: ComponentFixture<PrevprescriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevprescriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevprescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
