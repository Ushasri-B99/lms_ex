import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LeaveService } from 'src/app/services/Leave/leave.service';
import { LeavesTable2Component } from 'src/app/tables/leaves-table2/leaves-table2.component';
import { PendingLeavesComponent } from 'src/app/tables/pending-leaves/pending-leaves.component';
import { LeaveDetailsCardComponent } from '../Leaves/leave-details-card/leave-details-card.component';

@Component({
  selector: 'app-emp-leave-card-details',
  templateUrl: './emp-leave-card-details.component.html',
  styleUrls: ['./emp-leave-card-details.component.css']
})
export class EmpLeaveCardDetailsComponent  implements OnInit {

  allLeavesVar: any;
  pendingLeavesVar: any;
  approvedLeavesVar: any;
  rejectedLeavesVar: any;

  approveVar = false;
  rejectVar = false;

  @ViewChild("getRejectedLeavesDiv")  getRejectedLeavesDiv: ElementRef | undefined
  @ViewChild("getApprovedLeavesDiv")  getApprovedLeavesDiv: ElementRef | undefined
  @ViewChild("getPendingLeavesDiv")  getPendingLeavesDiv: ElementRef | undefined
  @ViewChild("getAllLeavesDiv")  getAllLeavesDiv: ElementRef | undefined  

    form: FormGroup;
    rowData:any;
  id
  empId
    constructor(private leaveService: LeaveService,
      private router : Router,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EmpLeaveCardDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) data,
        private leaveTable2:LeavesTable2Component,
        private pendingleaveTable:PendingLeavesComponent) {
        this.rowData = data;
        console.log("constructor in leave card details : ",this.rowData)
        this.id = sessionStorage.getItem('userId')
        this.empId = sessionStorage.getItem('empId')


    }    

    save() {
        this.dialogRef.close(this.rowData);
    }

    close() {
      // console.log("Clicked on Close")
      this.dialogRef.close();
    }
    /*
    edit(leaveId:number){
      this.leaveService.approveLeave(leaveId).subscribe(data => {
        console.log("After Approved Data: ",data);
      });
      document.getElementById("buttonDiv").classList.add("display-none");
      //document.getElementById("closeBtnDiv").classList.add("display-none");
      // this.getLeavesData();
      this.approveVar = true
      this.dialogRef.close();
    }
*/
    deleteReq(leaveId){
      this.leaveService.deleteLeaveReq(leaveId).subscribe(data => {
        console.log("After Approved Data: ",data);
        
      });
      this.router.navigateByUrl('/temp', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/employee-view']); // navigate to same route
      });
      this.dialogRef.close();
    }
  // constructor(private leaveService: LeaveService) { }

  getLeavesData(){
    {
      // this.leaveService.getAllLeaveDetails().subscribe(data => {
      //   this.allLeavesVar = data;
      // });
      this.leaveService.getPendingLeavesByUser(this.id).subscribe(data => {
        this.pendingLeavesVar = data;
      });
      /*
      this.leaveService.getApprovedLeaves().subscribe(data => {
        this.approvedLeavesVar = data;
      });
      this.leaveService.getApprovedLeaves().subscribe(data => {
        this.rejectedLeavesVar = data;
      });
      */
    }
  }
  ngOnInit(): void {
    this.getLeavesData()
  }
}