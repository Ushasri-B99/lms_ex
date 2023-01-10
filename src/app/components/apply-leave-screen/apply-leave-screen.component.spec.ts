import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyLeaveScreenComponent } from './apply-leave-screen.component';

describe('ApplyLeaveScreenComponent', () => {
  let component: ApplyLeaveScreenComponent;
  let fixture: ComponentFixture<ApplyLeaveScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyLeaveScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyLeaveScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
