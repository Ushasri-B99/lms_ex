import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApplicationDashboardComponent } from './leave-application-dashboard.component';

describe('LeaveApplicationDashboardComponent', () => {
  let component: LeaveApplicationDashboardComponent;
  let fixture: ComponentFixture<LeaveApplicationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveApplicationDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveApplicationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
