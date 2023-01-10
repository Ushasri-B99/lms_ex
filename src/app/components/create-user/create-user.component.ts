import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {

  }
  namePattern = "^[a-z]{8,15}$";
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  mobnumPattern = "[0-9]{10}"; 
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  createUserForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]'),Validators.maxLength(20),Validators.minLength(20)] ], //pattern="[a-zA-Z]+" ng-pattern-restrict
    lastName: ['', [Validators.required, Validators.pattern(this.namePattern)]],
    email: ['', [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]],
    gender: ['Male'],
    dob: ['', [Validators.required]],//[0-9]{3}-[0-9]{3}-[0-9]{4}  (/^[A-Za-z]+$/)
    phno: ['', [Validators.required],[Validators.maxLength(10)],[Validators.minLength(10)]],
    role:['',[Validators.required]],
    leaveBalance:['', Validators.required],
  });

  onSubmit(){

  }
  // ngOnInit(): void {
  //   this.reactiveForm()
  // }
  // /* Reactive form */
 

  // reactiveForm() {
  //   this.createUserForm = this.fb.group({
  //     fname: ['', [Validators.required],[Validators.min(3)]],
  //     lname: ['', [Validators.required]],
  //     email: ['', [Validators.required],[Validators.email]],
  //     gender: ['Male'],
  //     dob: ['', [Validators.required]],
  //     role: ['', [Validators.required]],
  //     phno: ['', [Validators.required],[Validators.maxLength(10)],[Validators.minLength(10)]],
  //     leavebal: ['', [Validators.required]],
  //   })
  // }
  // /* Date */
  //   date(e: { target: { value: string | number | Date; }; }) {
  //     var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
  //     this.myForm.get('dob').setValue(convertDate, {
  //       onlyself: true
  //     })
  //   }

  // export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  //   const password = control.get('password');
  //   const confirmPassword = control.get('confirmPassword');
  
  //   return password && confirmPassword && password.value === confirmPassword.value ? { confirmPassword: true } : null;
  // };
 
  public errorHandling = (control: string, error: string) => {
    return this.createUserForm.controls[control].hasError(error);
  }
  submitForm() {
    console.log(this.createUserForm.value)
  }
  reset1(){
    this.createUserForm.reset();
    // if(this.formDirective)
    //   this.formDirective.resetForm();
    Object.keys(this.createUserForm.controls).forEach(key => {
      this.createUserForm.get(key).setErrors(null) ;
    });
    // this.createUserForm.controls['firstName'].setValue(" ");
    // this.createUserForm.controls['lastName'].setValue(" ");
    // this.createUserForm.controls['email'].setValue(" ");
    // this.createUserForm.controls['dob'].setValue(" ");
    // this.createUserForm.controls['phno'].setValue(" ");
    // this.createUserForm.controls['role'].setValue(" ");
    // this.createUserForm.controls['leaveBalance'].setValue(" ");
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
