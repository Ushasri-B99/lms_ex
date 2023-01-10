import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/User/user.service';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';

@Component({
  selector: 'app-update-emp',
  templateUrl: './update-emp.component.html',
  styleUrls: ['./update-emp.component.css']
})
export class UpdateEmpComponent implements OnInit {
  rowData:any;
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  emp : any;
  constructor(
    private fb: FormBuilder, 
    private userService : UserService,
    private dialogRef: MatDialogRef<UpdateEmpComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    //this.rowData = data;
    this.rowData = data
    console.log("constructor in update details : ",)
    console.log("Updatedata" ,  this.rowData+ " and " + data)


  }

  ngOnInit(): void {

  }
  
  namePattern = "^[a-z][A-Z]$" //"^[a-z][{8,15}]$";
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  mobnumPattern = "[0-9]{10}"; 
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,4}$";

  updateEmpForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required,Validators.maxLength(20),Validators.minLength(5)] ], //pattern="[a-zA-Z]+" ng-pattern-restrict
    lastName: ['', [Validators.required,Validators.maxLength(20),Validators.minLength(5)]],
    empId: ['', [Validators.required,Validators.maxLength(20),Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]],
    gender: ['Male',[Validators.required]],
    phno: ['', [Validators.required,Validators.pattern('[0-9]{10}')]], //Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}'),Validators.maxLength(10),Validators.minLength(10)
    role:['',[Validators.required,Validators.maxLength(20),Validators.minLength(5)]],
    leaveBalance:['', [Validators.required,Validators.maxLength(2),Validators.minLength(1),Validators.pattern('[0-9]{10}')]], //,Validators.maxLength(2),Validators.minLength(1)
    admin_id: ['',],
  
  });

  Update(){
  if (this.updateEmpForm.valid) {
    console.log("Updatedata", this.rowData .empData),
    this.emp = {
      
      userId:  this.rowData .empData.userId,//sessionStorage.getItem('id'),
      email: this.form['email'].value,
      firstName: this.form['firstName'].value,
      gender: this.form['gender'].value,
      lastName:  this.form['lastName'].value,
      phoneNumber: this.form['phno'].value,
      role: this.form['role'].value,
      leave_bal: this.form['leaveBalance'].value,
      empId : this.form['empId'].value,
      // empId : sessionStorage.getItem('id'),

     adminRef:{
      admin_id: sessionStorage.getItem('adminId')//1 //this.form['admin_id'].value
      } 
    }
    this.updateEmp();
    this.reset1();
    // this.router.navigate(['createEmp']);
    console.log("After Reset ",this.updateEmpForm.value)
    this.dialogRef.close();
    
  } else {
    this.validateAllFormFields(this.updateEmpForm); //{7}
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
    return this.updateEmpForm.controls;
  }

  updateEmp(){
    this.userService.updateUser(this.emp).subscribe(
      (data=>{
        console.log(data);
      })
    )

    // alert("Employee added Successfully")
  }


  // export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  //   const password = control.get('password');
  //   const confirmPassword = control.get('confirmPassword');
  
  //   return password && confirmPassword && password.value === confirmPassword.value ? { confirmPassword: true } : null;
  // };
 
  public errorHandling = (control: string, error: string) => {
    return this.updateEmpForm.controls[control].hasError(error);
  }
  // submitForm() {
  //   console.log(this.createUserForm.value)
  // }
  reset1(){
    this.updateEmpForm.reset(); 
    // Object.keys(this.createUserForm.controls).forEach(key => {
    //   this.createUserForm.get(key).setErrors(null) ;
    // });
  
  }

}
