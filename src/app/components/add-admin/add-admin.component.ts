import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  admin : any;
  constructor(private fb: FormBuilder, private userService : UserService,private route: ActivatedRoute,
    private router: Router,
   ) {
  }

  ngOnInit(): void {

  }
  hide = true;
  
  namePattern = "^[a-z][A-Z]$" //"^[a-z][{8,15}]$";
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  mobnumPattern = "[0-9]{10}"; 
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,4}$";

  addAdminForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]],
    name: ['', [Validators.required,Validators.maxLength(20),Validators.minLength(5)] ], //pattern="[a-zA-Z]+" ng-pattern-restrict
    password : ['',[Validators.required,Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')]]
  
  });

  onSubmit(){
  if (this.addAdminForm.valid) {
    this.admin = {

      name: this.form['name'].value,
      email: this.form['email'].value,
      password: this.form['password'].value,

    }
    this.createAdmin();
    
    this.router.navigate[('/login')]

    // this.router.navigate(['createEmp']);
    console.log("After Reset ",this.addAdminForm.value)
    // this.dialogRef.close();
    
  } else {
    this.validateAllFormFields(this.addAdminForm); //{7}
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
    return this.addAdminForm.controls;
  }

  createAdmin(){
    this.userService.createAdmin(this.admin).subscribe(
      data=>{
    this.router.navigate[('/login')]
        this.reLoad();
        console.log(data);
      },
      err =>{
        console.log(err)
      }
      
    )

  }
 
  public errorHandling = (control: string, error: string) => {
    return this.addAdminForm.controls[control].hasError(error);
  }
 
  reset1(){
    this.addAdminForm.reset(); 

  }
  reLoad(){
    this.router.navigate(['/login'])
  }
}
