import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  user
  username ;
  password ;
  invalidLogin = false
  constructor(public formbuilder: FormBuilder, private router: Router, 
    private loginservice: AuthenticationServiceService,public userService : UserService) {}

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
      // this.router.navigate(['/myProfile'])
      this.router.navigate(['/applyLeave'])
      // this.router.navigateByUrl('/applyLeave')

      this.invalidLogin = false
      console.log("After routing")
    } else{
    console.log("Authentication Failure")
      this.invalidLogin = true
    }
  }
  /*
  login(username,password){
    this.userService.login(username, password).subscribe(
      data => {
        this.user = data;
        this.router.navigate(['applyLeave'])
      }
   );
  }
  */
  get form(){
    return this.loginForm.controls;
  }
 
}