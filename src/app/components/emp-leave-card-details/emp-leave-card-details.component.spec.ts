import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpLeaveCardDetailsComponent } from './emp-leave-card-details.component';

describe('EmpLeaveCardDetailsComponent', () => {
  let component: EmpLeaveCardDetailsComponent;
  let fixture: ComponentFixture<EmpLeaveCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpLeaveCardDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpLeaveCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
