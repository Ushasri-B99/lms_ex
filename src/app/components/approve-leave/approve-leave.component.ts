import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/User/user.service';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';

@Component({
  selector: 'app-approve-leave',
  templateUrl: './approve-leave.component.html',
  styleUrls: ['./approve-leave.component.css']
})
export class ApproveLeaveComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  remark : any;
  constructor(private fb: FormBuilder, private userService : UserService,private route: ActivatedRoute,
    private router: Router, private dialogRef: MatDialogRef<CreateEmployeeComponent>,
   ) {
    //this.rowData = data;
    console.log("constructor in leave card details : ",)

  }

  ngOnInit(): void {

  }
  

  approveLeaveForm: FormGroup = this.fb.group({
    
  
  });

  onSubmit(){
/*
    this.emp = new Employee();
    this.emp.firstName = this.form['firstName'].value;
    this.emp.lastName = this.form['lastName'].value;
    this.emp.email = this.form['email'].value;
    this.emp.gender = this.form['gender'].value;
    this.emp.phoneNumber = this.form['phno'].value;
    this.emp.role = this.form['role'].value;
    this.emp.leave_bal = this.form['leaveBalance'].value;
    this.emp.admin_id = this.form['admin_id'].value;
    this.saveEmp();
    this.reset1();
  }
  */
  if (this.approveLeaveForm.valid) {
    this.remark = {
      remark: this.form['remark'].value,     
      leave_id:this.form['admin_id'].value
      
    }
    this.saveEmp();
   
    // this.router.navigate(['createEmp']);
    console.log("After Reset ",this.approveLeaveForm.value)
    this.dialogRef.close();
    
  } else {
    this.validateAllFormFields(this.approveLeaveForm); //{7}
  }
    
  } 
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }    
  get form(){
    return this.approveLeaveForm.controls;
  }

  saveEmp(){
    this.userService.createUser(this.remark).subscribe(
      (data=>{
        console.log(data);
      })
    )

    // alert("Employee added Successfully")
  }


}
