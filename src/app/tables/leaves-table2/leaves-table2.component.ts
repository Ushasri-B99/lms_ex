import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LeaveDetailsCardComponent } from 'src/app/components/Leaves/leave-details-card/leave-details-card.component';
import { Leave } from 'src/app/model/Leave/leave';
import { LeaveService } from 'src/app/services/Leave/leave.service';

@Component({
  selector: 'app-leaves-table2',
  templateUrl: './leaves-table2.component.html',
  styleUrls: ['./leaves-table2.component.css']
})
export class LeavesTable2Component implements AfterViewInit, OnInit {
  displayedColumns = ['username', 'leaveReason', 'fromDate', 'toDate', 'createdAt', 'leaveType', 'noOfDays', 'status', 'adminRemark', 'lop', 'actions'];
  private leaves: Leave[];
  
  dataSource = new MatTableDataSource<Leave>();
  @ViewChild('leaveTbSort') leaveTbSort = new MatSort();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  adminId
  constructor(
    private leaveService: LeaveService, 
    private dialog: MatDialog,
    private router: Router ){
      this.adminId = sessionStorage.getItem('adminId')
    }

ngOnInit(): void {

  this.getLeavesDat();
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


getLeavesDat(){
  this.leaveService.getAllLeaveDetailsByAdminId(this.adminId).subscribe(data => {
    this.leaves = data;
    this.dataSource.data = this.leaves;
    // console.log("*********datasouce******** ",this.leaves.length)
    if(this.leaves.length == 0){
      // console.log("***************** ",this.leaves.length)
  
      document.getElementById("emptyDivl").classList.remove("display-none");
      document.getElementById("tableDivl").classList.add("display-none")
    }
  },
  err =>{
    alert("No Pending Leaves")
    document.getElementById("emptyDivl").classList.toggle("display-none");
    document.getElementById("tableDivl").classList.toggle("display-none")

  });
  // console.log("*********datasouce******** ",this.leaves.length)

  
  // else if(this.leaves.length === 0)
}
reLoad(){
  this.router.navigate([this.router.url])
  }
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
      this.getLeavesDat();
      this.reLoad()
    }
  );
 }


}
