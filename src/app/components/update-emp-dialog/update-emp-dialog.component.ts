import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaveService } from 'src/app/services/Leave/leave.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-update-emp-dialog',
  templateUrl: './update-emp-dialog.component.html',
  styleUrls: ['./update-emp-dialog.component.css']
})
export class UpdateEmpDialogComponent implements OnInit {
  empId:any;
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  emp : any;
  firstName = null
  lastName;
  email; 
  gender; 
  phno;
  role;
  leaveBalance;
  //empData:any = null
  constructor(
    private fb:FormBuilder,
    private userService : UserService,
    private leaveService: LeaveService,
    private dialogRef: MatDialogRef<UpdateEmpDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        this.empId = data.id
        this.firstName = data.firstName
        this.lastName = data.lastName
        
        this.email = data.email
        this.gender = data.gender
        this.phno = data.phno
        this.role = data.role
        this.leaveBalance = data.leaveBalance
        console.log("constructor in update details : ",)
        console.log("Updatedata" ,  this.empId+ " and " + data)
    }
  //  if(data){
  //   this.empId = data.id
  //   this.firstName = data.firstName
  //   this.lastName = data.lastName
    
  //   this.email = data.email
  //   this.gender = data.gender
  //   this.phno = data.phno
  //   this.role = data.role
  //   this.leaveBalance = data.leaveBalance

  //  }

  ngOnInit(): void {
    console.log(this.firstName)
    //this.form['firstName'].setValue(this.firstName);
    //this.form['firstName'].setValue =this.firstName
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
    leaveBalance:['', [Validators.required,Validators.maxLength(2),Validators.minLength(1),Validators.pattern('[0-9]{0,2}')]], //,Validators.maxLength(2),Validators.minLength(1)
    //admin_id: ['',],
   
  });
  public errorHandling = (control: string, error: string) => {
    return this.updateEmpForm.controls[control].hasError(error);
  }
  Update(){
    
    if (this.updateEmpForm.valid) {
      console.log("Updatedata", this.empId),
      this.emp = {
        
        userId:  this.empId,//sessionStorage.getItem('id'),
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
    }
    reset1(){
      this.updateEmpForm.reset(); 
      // Object.keys(this.createUserForm.controls).forEach(key => {
      //   this.createUserForm.get(key).setErrors(null) ;
      // });
    
    }
  }
