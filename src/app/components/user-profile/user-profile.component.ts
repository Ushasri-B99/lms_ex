import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LeaveService } from 'src/app/services/Leave/leave.service';
import { UserService } from 'src/app/services/User/user.service';
import { UpdateEmpComponent } from '../update-emp/update-emp.component';
import { UpdatePasswordComponent } from '../update-password/update-password.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService, private leaveservice: LeaveService, public dialog: MatDialog,) { }
  user
  userList : any;
  leavelist : any;
  empid
  ngOnInit(): void {
    this.empid = sessionStorage.getItem("empId")
    this.getUser(sessionStorage.getItem('userId'));
    this.getLeaveList()
  }
  getUser(id){
    this.userService.getUserById(id).subscribe(
      data => {
        this.user = data;
        console.log(this.user)
      },
      err =>{
        alert("No user With this Id : "+ err.message);
      }
    )
  }

  getLeaveList(){

  }
  update(){
    const dialogConfig2 = new MatDialogConfig();
    dialogConfig2.hasBackdrop = true; //default true
    // dialogConfig.disableClose = true;
    dialogConfig2.autoFocus = true;
   // dialogConfig2.data = rowData
    //console.log("After assign data to dialogConfig ",rowData)
    //this.dialog.open(EmpDetailsCardComponent, dialogConfig);   
    const dialogRef2 = this.dialog.open(UpdatePasswordComponent, dialogConfig2);
    dialogRef2.afterClosed().subscribe(
          data => {
            
            console.log("Dialog output:", data)
          }
        );
  }
  
  // viewDetails(rowData) {
  //   console.log("while Clicking on dialog: ",rowData)
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.hasBackdrop = true; //default true
  //   // dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.data = rowData
  //   console.log("After assign data to dialogConfig ",rowData)
  //   //this.dialog.open(EmpDetailsCardComponent, dialogConfig);   
  //   const dialogRef = this.dialog.open(this.UpdatePasswordComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe(
  //     data => {
  //       this.getAllUsers();
  //       console.log("Dialog output:", data)
  //     }
  //   );
  //   }
    
  // UpdatePasswordComponent

}
