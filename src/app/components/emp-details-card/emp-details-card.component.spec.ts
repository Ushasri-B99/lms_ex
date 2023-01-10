import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDetailsCardComponent } from './emp-details-card.component';

describe('EmpDetailsCardComponent', () => {
  let component: EmpDetailsCardComponent;
  let fixture: ComponentFixture<EmpDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpDetailsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
