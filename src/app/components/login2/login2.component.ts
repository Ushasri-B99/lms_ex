import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {
  user
  username ;
  password ;
  invalidLogin = false
  constructor(public formbuilder: FormBuilder, private router: Router, 
    private loginservice: AuthenticationServiceService,public userService : UserService) {}
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  hide = true;
  loginForm: FormGroup = this.formbuilder.group({
        username: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(10)]],
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
      
      this.router.navigate(['myProfile']);

      // this.router.navigate(['apply-leave'])
      // this.router.navigateByUrl('apply leave');
      this.invalidLogin = false
      //this.login(this.username, this.password);
      console.log("After routing")
    } else{
    console.log("Authentication Failure")
      this.invalidLogin = true
    }
  }
  login(username,password){
    this.userService.login(username, password).subscribe(
      data => {
        this.user = data;
        // console.log("user Service : autthenticate " ,data);
        // sessionStorage.setItem('userName', username);
        // sessionStorage.setItem('id', data['userId']);
        // sessionStorage.setItem('fullName', data['firstName']+" "+data['lastName']);
        this.router.navigate(['apply-leave'])
      }
   );
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
