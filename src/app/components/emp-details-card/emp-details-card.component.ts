import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataSubService } from 'src/app/services/data-sub.service';
import { LeaveService } from 'src/app/services/Leave/leave.service';
import { UserService } from 'src/app/services/User/user.service';
import { LeaveDetailsCardComponent } from '../Leaves/leave-details-card/leave-details-card.component';

@Component({
  selector: 'app-emp-details-card',
  templateUrl: './emp-details-card.component.html',
  styleUrls: ['./emp-details-card.component.css']
})
export class EmpDetailsCardComponent implements OnInit {

  employeeLeaves: any;
  Employeedetails: any; 
  form: FormGroup;
  rowData:any;
x
    constructor(
      private userService: UserService,
      // private dataService : DataSubService,
      private router: Router,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EmpDetailsCardComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        this.rowData = data;
        console.log("constructor in leave card details : ",this.rowData)
      //  this.x = this.dataService.getEmployeeData().subscribe()


    }    
    save() {
        this.dialogRef.close(this.rowData);
    }

    close() {
      // console.log("Clicked on Close")
      this.dialogRef.close();
    }
    

  // constructor(private leaveService: LeaveService) { }

  getEmployeesData(){
    
      this.userService.getAllUser().subscribe(data => {
        this.Employeedetails = data;
      });
  }
  ngOnInit(): void {
    this.getEmployeesData();
  }
  updateEmp(empid){
    this.router.navigate(['./updateEmp']);
    this.dialogRef.close();
     
  }

  removeEmp(empId){
    console.log(empId)
    this.userService.deleteUser(empId).subscribe(
      data => console.log(data),
      err => alert(err.error.message)
      
      );
    
      // this.userService.getAllUser().subscribe(
      //   data => this.x.next(data)
      // )
      // this.reLoad();
      // location.reload();
      // this.router.navigate(['./employees'])
      this.router.navigateByUrl('/temp', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/employees']); // navigate to same route
      });
      this.dialogRef.close(this.x);
      //this.router.navigate(['./employees']);
  }
  reLoad(){
    this.router.navigate([this.router.url])
  }
  closed(){
    this.router.navigate(['./employees'])
  }

}
