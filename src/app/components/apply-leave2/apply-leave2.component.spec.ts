import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyLeave2Component } from './apply-leave2.component';

describe('ApplyLeave2Component', () => {
  let component: ApplyLeave2Component;
  let fixture: ComponentFixture<ApplyLeave2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyLeave2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyLeave2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
