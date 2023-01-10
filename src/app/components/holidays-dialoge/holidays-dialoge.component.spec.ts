import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysDialogeComponent } from './holidays-dialoge.component';

describe('HolidaysDialogeComponent', () => {
  let component: HolidaysDialogeComponent;
  let fixture: ComponentFixture<HolidaysDialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidaysDialogeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidaysDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
