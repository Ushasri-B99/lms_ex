import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { AddAdminComponent } from '../add-admin/add-admin.component';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  ngOnInit(): void {
  }
 
  username ;
  password ;
  invalidLogin = false
  constructor(public formbuilder: FormBuilder,private route: ActivatedRoute, private router: Router, 
    private loginservice: AuthenticationServiceService,public dialog: MatDialog) {}
  hide = true;
  adminLoginForm: FormGroup = this.formbuilder.group({
        username: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(10)]],
        password : ['',[Validators.required,Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')]]
      })
   
  public errorHandling = (control: string, error: string) => {
    return this.adminLoginForm.controls[control].hasError(error);
  }
  submitForm() {
    console.log(this.adminLoginForm.value)
    if(this.adminLoginForm.valid){
      console.log("Form valid")
      this.username = this.form['username'].value,
      this.password = this.form['password'].value,
      this.checkLogin();
      
    }else {
      console.log("Form Invalid")
      this.validateAllFormFields(this.adminLoginForm); //{7}
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
  checkLogin() {
    console.log("checkLogin")

    if (this.loginservice.authenticateAdmin(this.username, this.password)) {
      console.log("Authentication Success") //leave applications
      this.router.navigate(['/leaveApplications'])
      // this.router.navigateByUrl('apply leave');
      this.invalidLogin = false
      console.log("After routing")
    } else{
    console.log("Authentication Failure")
      this.invalidLogin = true
    }
  }
  get form(){
    return this.adminLoginForm.controls;
  }
  get userNameError(): string {
    const form: FormControl = (this.adminLoginForm.get('username') as FormControl);
    // var errorMsg : string;
    // var finalMsg : string;
    // errorMsg = form.hasError('required') ? 'FirstName Required ' :''
    // finalMsg = finalMsg + errorMsg
    // errorMsg = form.hasError('maxlength') ? ' Max length error' : ''  
    // finalMsg = finalMsg + errorMsg
    // errorMsg = form.hasError('minlength') ?' Min length error' : ''
    // finalMsg = finalMsg + errorMsg
    // console.log(finalMsg)
  
    // finalMsg = finalMsg.replace('undefined','');
  
    // console.log(finalMsg)
    // return finalMsg
  
    return form.hasError('required') ?
      'Required error message' :
      form.hasError('maxlength') ?
      'Max length error' : 
      form.hasError('minlength') ?
      'Min length error' :
      form.hasError('nowhitespaceerror') ?
      'No white space error' : '';
  }
  register(){
    const dialogRef = this.dialog.open(AddAdminComponent);
    dialogRef.afterClosed().subscribe(result => {    
      this.reLoad();   
    });
  }
  reLoad(){
    this.router.navigate([this.router.url])
  }
  
}



