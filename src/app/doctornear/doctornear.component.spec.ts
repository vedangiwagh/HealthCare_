import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctornearComponent } from './doctornear.component';

describe('DoctornearComponent', () => {
  let component: DoctornearComponent;
  let fixture: ComponentFixture<DoctornearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctornearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctornearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
