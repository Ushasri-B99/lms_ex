import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/User/user.service';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  emp : any;
  userList : any
  password : any
  userId
  empPswd
  oldPswd
  newPswd
  hide = true;
  constructor(private fb: FormBuilder, private userService : UserService,private route: ActivatedRoute,
    private router: Router, private dialogRef: MatDialogRef<UpdatePasswordComponent>,
   ) {}
//userId firstName lastName  gender email role phoneNumber leave_bal adminId adminName leavesList -->

  ngOnInit(): void {
    this.userService.getAllUserP().subscribe(
      data =>{
        this.userList = data;
      }
    );
    this.userId = sessionStorage.getItem('userId')
    // this.userList.forEach(function(user){
    //   if(user.userId === sessionStorage.getItem('id')){
    //     this.password = user.password
    //     console.log(user.password)
    //   }
    // })
  }
  
  // namePattern = "^[a-z][A-Z]$" //"^[a-z][{8,15}]$";
  // pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,15}$";
  // password : ['',[Validators.required,Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')]]

 
  // npswd cpswd opswd
  updatePswd: FormGroup = this.fb.group({
    npswd : ['',[Validators.required,Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')]],
    cpswd : ['',[Validators.required,Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')]],
    opswd : ['',[Validators.required,Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')]],

    // npswd: ['', [Validators.required,Validators.maxLength(20),Validators.minLength(5),Validators.pattern(this.pwdPattern)] ], //pattern="[a-zA-Z]+" ng-pattern-restrict
    // cpswd: ['', [Validators.required,Validators.maxLength(20),Validators.minLength(5),Validators.pattern(this.pwdPattern)]],
    // opswd: ['', [Validators.required,Validators.maxLength(20),Validators.minLength(5),Validators.pattern(Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}'))]], 
  });

  onSubmit(){
  if (this.updatePswd.valid) {
    if(this.form['npswd'].value === this.form['cpswd'].value){
      this.oldPswd = this.form['opswd'].value,
      this.newPswd = this.form['npswd'].value
      // if(this.password === this.form['opswd'].value){
        // console.log( "corect pswd: ",sessionStorage.getItem("id"))
     
        this.empPswd = {
          oldPswd : this.form['opswd'].value,
          newPswd: this.form['npswd'].value,
          // cpswd: this.form['cpswd'].value,
          userId : sessionStorage.getItem('userId')
        }
        
      // }
      // else{
      //   console.log( "wrong pswd: ",sessionStorage.getItem("id"))

     // }
     
    }
    else{

      alert(" New Password and Confirm Password must be given same value")
      
    }
    
    // this.emp = {
    //   npswd: this.form['email'].value,
    //   cpswd: this.form['firstName'].value,
    //   opswd: this.form['empId'].value,
    //   gender: this.form['gender'].value,
    //   lastName:  this.form['lastName'].value,
    //   phoneNumber: this.form['phno'].value,
    //   role: this.form['role'].value,
    //   leave_bal: this.form['leaveBalance'].value,
    //  adminRef:{
    //   admin_id:this.form['admin_id'].value
    //   } 
    // }
    this.update();
    this.reset1();
    // this.router.navigate(['createEmp']);
    console.log("After Reset ",this.updatePswd.value)
    this.dialogRef.close();
    
  } else {
    this.validateAllFormFields(this.updatePswd); //{7}
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
    return this.updatePswd.controls;
  }

  // saveEmp(){
  //   this.userService.createUser(this.emp).subscribe(
  //     (data=>{
  //       console.log(data);
  //     })
  //   )
  // }

update(){
  this.userService.updatePassword(this.empPswd).subscribe(
    data =>{
      alert("success")
      this.router.navigate(['/logout'])
    },
    err=>{
      alert("You have entered wrong old password")

      console.log(err)
    }
  )
  
}
  // export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  //   const password = control.get('password');
  //   const confirmPassword = control.get('confirmPassword');
  
  //   return password && confirmPassword && password.value === confirmPassword.value ? { confirmPassword: true } : null;
  // };

  
 
  public errorHandling = (control: string, error: string) => {
    return this.updatePswd.controls[control].hasError(error);
  }
  
  reset1(){
    this.updatePswd.reset(); 
    // Object.keys(this.createUserForm.controls).forEach(key => {
    //   this.createUserForm.get(key).setErrors(null) ;
    // });
  
  }
 

}
