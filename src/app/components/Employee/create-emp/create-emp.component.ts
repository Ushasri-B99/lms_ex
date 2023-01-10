import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/Employee/employee';
import { UserService } from 'src/app/services/User/user.service';
import { CreateEmployeeComponent } from '../../create-employee/create-employee.component';

@Component({
  selector: 'app-create-emp',
  templateUrl: './create-emp.component.html',
  styleUrls: ['./create-emp.component.css']
})
export class CreateEmpComponent  {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  emp : any;
  constructor(private fb: FormBuilder, private userService : UserService,private route: ActivatedRoute,
    private router: Router, private dialogRef: MatDialogRef<CreateEmployeeComponent>,
   ) {
    //this.rowData = data;
    console.log("constructor in leave card details : ",)

  }

  ngOnInit(): void {

  }
  
  namePattern = "^[a-z][A-Z]$" //"^[a-z][{8,15}]$";
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  mobnumPattern = "[0-9]{10}"; 
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,4}$";

  createUserForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required,Validators.maxLength(20),Validators.minLength(5)] ], //pattern="[a-zA-Z]+" ng-pattern-restrict
    lastName: ['', [Validators.required,Validators.maxLength(20),Validators.minLength(5)]],
    empId: ['', [Validators.required,Validators.maxLength(20),Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]],
    gender: ['Male'],
    phno: ['', [Validators.required,Validators.pattern('[0-9]{10}')]], //Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}'),Validators.maxLength(10),Validators.minLength(10)
    role:['',[Validators.required,Validators.maxLength(20),Validators.minLength(5)]],
    leaveBalance:['', [Validators.required,Validators.maxLength(2),Validators.minLength(1),Validators.pattern('[0-9]{0,2}')]], //,Validators.maxLength(2),Validators.minLength(1)
    //admin_id: ['',],
  
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
  if (this.createUserForm.valid) {
    this.emp = {
      email: this.form['email'].value,
      firstName: this.form['firstName'].value,
      empId: this.form['empId'].value,
      gender: this.form['gender'].value,
      lastName:  this.form['lastName'].value,
      phoneNumber: this.form['phno'].value,
      role: this.form['role'].value,
      leave_bal: this.form['leaveBalance'].value,
     adminRef:{
      admin_id:sessionStorage.getItem('adminId')
      } 
    }
    this.saveEmp();
    
    this.reset1();
    // this.router.navigate(['createEmp']);
    console.log("After Reset ",this.createUserForm.value)
    this.dialogRef.close();
    
  } else {
    this.validateAllFormFields(this.createUserForm); //{7}
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
    return this.createUserForm.controls;
  }

  saveEmp(){
    this.userService.createUser(this.emp).subscribe(
      (data=>{
        this.reLoad();
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
    return this.createUserForm.controls[control].hasError(error);
  }
  // submitForm() {
  //   console.log(this.createUserForm.value)
  // }
  reset1(){
    this.createUserForm.reset(); 
    // Object.keys(this.createUserForm.controls).forEach(key => {
    //   this.createUserForm.get(key).setErrors(null) ;
    // });
  
  }
  reLoad(){
    this.router.navigate([this.router.url])
  }
  /*
 get phonoErrorMsg(): string {
    const form: FormControl = (this.createUserForm.get('phno') as FormControl);
    var errorMsg : string;
    var finalMsg : string;
    errorMsg = form.hasError('required') ? '*Phone No Required ' :''
    finalMsg = finalMsg + errorMsg
    errorMsg = form.hasError('maxlength') ? ' *Max length error' : '--'  
    finalMsg = finalMsg + errorMsg
    errorMsg = form.hasError('minlength') ?' *Min length error' : '--'
    finalMsg = finalMsg + errorMsg
    
    console.log("phonoErrorMsg : "+finalMsg)

    finalMsg = finalMsg.replace('undefined','');
  
    console.log("phonoErrorMsg : "+finalMsg)
    return finalMsg
     
 }
 get emailError(): string {
  const form: FormControl = (this.createUserForm.get('email') as FormControl);
  return form.hasError('required') ?
    'Required error message' :
    form.hasError('pattern') ?
    "Must be this 'abc@AbortController.com' pattern" : '';
}
get firstNameError(): string {
  const form: FormControl = (this.createUserForm.get('firstName') as FormControl);
  var errorMsg : string;
  var finalMsg : string;
  errorMsg = form.hasError('required') ? 'FirstName Required ' :''
  finalMsg = finalMsg + errorMsg
  errorMsg = form.hasError('maxlength') ? ' Max length error' : ''  
  finalMsg = finalMsg + errorMsg
  errorMsg = form.hasError('minlength') ?' Min length error' : ''
  finalMsg = finalMsg + errorMsg
  console.log(finalMsg)

  finalMsg = finalMsg.replace('undefined','');

  console.log(finalMsg)
  return finalMsg
}
  // const form: FormControl = (this.createUserForm.get('FirstName') as FormControl);
  // return form.hasError('required') ?
  //   'Required error message' :
  //   form.hasError('maxlength') ?
  //   'Max length error' : 
  //   form.hasError('minlength') ?
  //   'Min length error' :
  //   form.hasError('nowhitespaceerror') ?
  //   'No white space error' : '';

 errors(ctrl: FormControl): string[] {
  return ctrl.errors ? Object.keys(ctrl.errors) : [];
}
//  <mat-error *ngIf="errorHandling('phno', 'pattern')">Enter number</mat-error> 
//         <mat-error *ngIf="errorHandling('phno', 'maxlength')">Length Must be 10 digits</mat-error> 
//         <mat-error *ngIf="errorHandling('phno', 'minlength')">Length Must be 100 digits</mat-error> 
   */      
 

}
