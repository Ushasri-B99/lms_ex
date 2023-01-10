import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmpDialogComponent } from './update-emp-dialog.component';

describe('UpdateEmpDialogComponent', () => {
  let component: UpdateEmpDialogComponent;
  let fixture: ComponentFixture<UpdateEmpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmpDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
