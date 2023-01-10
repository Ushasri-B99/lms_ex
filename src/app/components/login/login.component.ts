import { Component, OnInit,ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface Subject {
  name: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {   
  /*
  username = 'javainuse'
  password = ''
  invalidLogin = false

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin() {
    if (this.loginservice.authenticate(this.username, this.password)
    ) {
      this.router.navigate([''])
      this.invalidLogin = false
    } else
      this.invalidLogin = true
  }
  */
  username ;
  password ;
  invalidLogin = false
  constructor(public formbuilder: FormBuilder,private route: ActivatedRoute, private router: Router, 
    private loginservice: AuthenticationServiceService) {}
  hide = true;
  loginForm: FormGroup = this.formbuilder.group({
        username: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(10)]],
        password : ['',[Validators.required,Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')]]
      })
   
  public errorHandling = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  }
  submitForm() {
    console.log(this.loginForm.value)
    if(this.loginForm.valid){
      console.log("Form valid")
      this.username = this.form['username'].value,
      this.password = this.form['password'].value,
      this.checkLogin();
      
    }else {
      console.log("Form Invalid")
      this.validateAllFormFields(this.loginForm); //{7}
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

    if (this.loginservice.authenticateUser(this.username, this.password)) {
      console.log("Authentication Success") //leave applications
      this.router.navigate(['/applyLeave'])
      // this.router.navigateByUrl('apply leave');
      this.invalidLogin = false
      console.log("After routing")
    } else{
    console.log("Authentication Failure")
      this.invalidLogin = true
    }
  }
  get form(){
    return this.loginForm.controls;
  }
  get userNameError(): string {
    const form: FormControl = (this.loginForm.get('username') as FormControl);
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
  
}


