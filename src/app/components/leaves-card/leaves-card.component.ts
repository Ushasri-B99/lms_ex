import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaveService } from 'src/app/services/Leave/leave.service';

@Component({
  selector: 'app-leaves-card',
  templateUrl: './leaves-card.component.html',
  styleUrls: ['./leaves-card.component.css']
})
export class LeavesCardComponent implements OnInit {
// rowData:any
  constructor(private leaveService:LeaveService, public dialogRef: MatDialogRef<LeavesCardComponent>,
    @Inject(MAT_DIALOG_DATA) public rowData,
  ) {} 

  ngOnInit(): void {
  }
  close() {
    // console.log("Clicked on Close")
    this.dialogRef.close();
  }
  

    // constructor(private leaveService: LeaveService,
    //     private fb: FormBuilder,
    //     private dialogRef: MatDialogRef<LeaveDetailsCardComponent>,
    //     @Inject(MAT_DIALOG_DATA) data) {
    //     this.rowData = data;
    //     console.log("constructor in leave card details : ",this.rowData)

    // }

    

    save() {
        this.dialogRef.close(this.rowData);
    }
   
    approve(leaveId:number){
      this.leaveService.approveLeave(leaveId).subscribe(data => {
        console.log("After Approved Data: ",data);
      });   
      this.dialogRef.close();
    }

    reject(leaveId){
      this.leaveService.rejectLeave(leaveId).subscribe(data => {
        console.log("After Approved Data: ",data);
      });
      this.dialogRef.close();
    }

}
/*
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
      admin_id:this.form['admin_id'].value
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
        console.log(data);
      })
    )

    
  }


 
  public errorHandling = (control: string, error: string) => {
    return this.createUserForm.controls[control].hasError(error);
  }
 
  reset1(){
    this.createUserForm.reset(); 
   
  
  }
  

*/
