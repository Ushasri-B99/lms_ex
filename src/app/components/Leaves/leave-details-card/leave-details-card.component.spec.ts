import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDetailsCardComponent } from './leave-details-card.component';

describe('LeaveDetailsCardComponent', () => {
  let component: LeaveDetailsCardComponent;
  let fixture: ComponentFixture<LeaveDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveDetailsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
