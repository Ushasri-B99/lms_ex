import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Leave } from 'src/app/model/Leave/leave';
import { LeaveService } from 'src/app/services/Leave/leave.service';
import { LeavesTable2Component } from 'src/app/tables/leaves-table2/leaves-table2.component';
import { PendingLeavesComponent } from 'src/app/tables/pending-leaves/pending-leaves.component';

@Component({
  selector: 'app-leave-details-card',
  templateUrl: './leave-details-card.component.html',
  styleUrls: ['./leave-details-card.component.css']
})
export class LeaveDetailsCardComponent implements OnInit {

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

    constructor(private leaveService: LeaveService,
      private router : Router,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<LeaveDetailsCardComponent>,
        @Inject(MAT_DIALOG_DATA) data,
        private leaveTable2:LeavesTable2Component,
        private pendingleaveTable:PendingLeavesComponent) {
        this.rowData = data;
        console.log("constructor in leave card details : ",this.rowData)

    }    

    save() {
        this.dialogRef.close(this.rowData);
    }

    close() {
      // console.log("Clicked on Close")
      this.dialogRef.close();
    }
    approve(leaveId:number){
      this.leaveService.approveLeave(leaveId).subscribe(data => {
        console.log("After Approved Data: ",data);
        this.reLoad();
      });
      document.getElementById("buttonDiv").classList.add("display-none");
      //document.getElementById("closeBtnDiv").classList.add("display-none");
      // this.getLeavesData();
      this.approveVar = true
      this.dialogRef.close();
    }

    reject(leaveId){
      this.leaveService.rejectLeave(leaveId).subscribe(data => {
        console.log("After Approved Data: ",data);
        this.reLoad();

        this.getLeavesData();
        this.pendingleaveTable.dataSource = this.pendingLeavesVar
        
      });
      this.dialogRef.close();
    }
  // constructor(private leaveService: LeaveService) { }

  getLeavesData(){
    {
      // this.leaveService.getAllLeaveDetails().subscribe(data => {
      //   this.allLeavesVar = data;
      // });
      this.leaveService.getPendingLeaves().subscribe(data => {
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
  reLoad(){
    this.router.navigate([this.router.url])
    }
}
