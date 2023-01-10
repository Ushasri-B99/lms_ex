import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LeaveDetailsCardComponent } from 'src/app/components/Leaves/leave-details-card/leave-details-card.component';
import { Leave } from 'src/app/model/Leave/leave';
import { LeaveService } from 'src/app/services/Leave/leave.service';

@Component({
  selector: 'app-rejected-leaves',
  templateUrl: './rejected-leaves.component.html',
  styleUrls: ['./rejected-leaves.component.css']
})
export class RejectedLeavesComponent implements AfterViewInit,OnInit {
  displayedColumns = ['username', 'leaveReason', 'fromDate', 'toDate', 'createdAt', 'leaveType', 'noOfDays', 'status', 'adminRemark', 'lop', 'actions'];
  private rejectedLeaves: Leave[];  
  dataSource = new MatTableDataSource<Leave>();
  @ViewChild('leaveTbSort') leaveTbSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  adminId
  constructor(
    private leaveService: LeaveService, 
    private dialog: MatDialog ,
    private router: Router){
      this.adminId = sessionStorage.getItem('adminId')
    }
  
ngOnInit(): void {
  this.getRejectLeaves();
}

ngAfterViewInit(): void {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
  console.log(this.dataSource.data)
}
getRecord(row){
  console.log(row)
}
// constructor(private dialog: MatDialog) {}

viewLeaves(rowData) {
  console.log("while Clicking on dialog: ",rowData)
  const dialogConfig = new MatDialogConfig();
  dialogConfig.hasBackdrop = true; //default true
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = rowData
  console.log("After assign data to dialogConfig ",rowData)

 // this.dialog.open(LeaveDetailsCardComponent, dialogConfig);   
  const dialogRef = this.dialog.open(LeaveDetailsCardComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(
    data => {
      this.getRejectLeaves();   
      // this.reLoad();

      console.log("Dialog output:", data);
    }
  );

  
  }
getRejectLeaves(){
  this.leaveService.getRejectedLeavesByAdminId(this.adminId).subscribe(data => {
    this.rejectedLeaves = data;
    this.dataSource.data = this.rejectedLeaves;
  },
  err =>{
    // alert("No Reject Leaves")
    document.getElementById("emptyDiv_").classList.remove("display-none");
    document.getElementById("tableDiv_").classList.add("display-none");

  });
}
reLoad(){
  this.router.navigate([this.router.url])
  }
 
}















 

