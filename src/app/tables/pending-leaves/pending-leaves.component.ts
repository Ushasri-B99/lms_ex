import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LeavesCardComponent } from 'src/app/components/leaves-card/leaves-card.component';
import { LeaveDetailsCardComponent } from 'src/app/components/Leaves/leave-details-card/leave-details-card.component';
import { Leave } from 'src/app/model/Leave/leave';
import { LeaveService } from 'src/app/services/Leave/leave.service';

@Component({
  selector: 'app-pending-leaves',
  templateUrl: './pending-leaves.component.html',
  styleUrls: ['./pending-leaves.component.css']
})
export class PendingLeavesComponent implements AfterViewInit {
	
  displayedColumns = ['username', 'leaveReason', 'fromDate', 'toDate', 'createdAt', 'leaveType', 'noOfDays', 'status', 'adminRemark', 'lop', 'actions'];
  private pendingLeaves: any[];
  dataSource = new MatTableDataSource<any>();
  @ViewChild('leaveTbSort') leaveTbSort = new MatSort();
adminId
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // static router: any;
  //static router: any;
  constructor(
    private leaveService: LeaveService, 
    private dialog: MatDialog,
    private router: Router ){
      this.adminId = sessionStorage.getItem('adminId')
    }

  
ngOnInit(): void {

  this.getPendingLeave();
}

ngAfterViewInit(): void {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
  console.log(this.dataSource.data)
}
getRecord(row){
  console.log(row)
}
 reLoad(){
  this.router.navigate([this.router.url])
  }
viewLeaves(rowData) {
  console.log("while Clicking on dialog: ",rowData)
  const dialogConfig = new MatDialogConfig();
  dialogConfig.hasBackdrop = true; //default true
  //dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = rowData
  console.log("After assign data to dialogConfig ",rowData)
 // this.dialog.open(LeaveDetailsCardComponent, dialogConfig);   
  const dialogRef = this.dialog.open(LeaveDetailsCardComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(  
    data => {
      this.getPendingLeave();
      // this.reLoad();
      console.log("Dialog output:", data)
    }
  );
  this.getPendingLeave();
  }
getPendingLeave(){
  this.leaveService.getPendingLeavesByAdminId(this.adminId).subscribe(data => {
    this.pendingLeaves = data;
    this.dataSource.data = this.pendingLeaves;
    console.log(this.pendingLeaves)
  },
  err =>{
    //alert("No Pending Leaves")
    document.getElementById("emptyDiv").classList.remove("display-none");
    document.getElementById("tableDiv").classList.add("display-none");

  });
}


}
