import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevallComponent } from './prevall.component';

describe('PrevallComponent', () => {
  let component: PrevallComponent;
  let fixture: ComponentFixture<PrevallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
