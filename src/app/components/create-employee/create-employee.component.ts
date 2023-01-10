import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {

  }

  addForm: FormGroup = this.fb.group({
    firstName: [, [Validators.required]],
    lastName: [, [Validators.required]],
    email: [, [Validators.required, Validators.email]],
    phno: [, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    role:['',[Validators.required]],
    leaveBalance:['', Validators.required],
    date:['', Validators.required]

    
    
  });

  onSubmit(){

  }

}
