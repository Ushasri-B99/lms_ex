import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmpLeaveCardDetailsComponent } from 'src/app/components/emp-leave-card-details/emp-leave-card-details.component';
import { Leave } from 'src/app/model/Leave/leave';
import { LeaveService } from 'src/app/services/Leave/leave.service';

@Component({
  selector: 'app-user-approved-tab',
  templateUrl: './user-approved-tab.component.html',
  styleUrls: ['./user-approved-tab.component.css']
})
export class UserApprovedTabComponent implements AfterViewInit,OnInit {
  displayedColumns = ['username', 'leaveReason', 'fromDate', 'toDate', 'createdAt', 'leaveType', 'noOfDays', 'status', 'adminRemark', 'lop', 'actions'];
  

  private allLeaves: Leave[];
  private approvedLeaves: Leave[];
  private rejectedLeaves: Leave[];
  private pendingLeaves: Leave[];
  dataSource = new MatTableDataSource<Leave>();
  empId
  id
  @ViewChild('approveTbSort') approveTbSort = new MatSort();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor( private leaveService: LeaveService, private dialog: MatDialog,private router:Router) { 
    this.empId = sessionStorage.getItem('empId')
    this.id = sessionStorage.getItem('userId')

  }
 

  ngOnInit(): void {
   this.getApprovedLeaves();
  }
  getApprovedLeaves(){
      this.leaveService.getApprovedLeavesByUser(this.id).subscribe(data => {
      this.approvedLeaves = data;
      this.dataSource.data = this.approvedLeaves;
      console.log("Approved Leaves")
      console.log(this.approvedLeaves)
    }, 
    err =>{
      //alert("No Pending Leaves")
      document.getElementById("emptyDiv1").classList.remove("display-none");
      document.getElementById("tableDiv1").classList.add("display-none");
  
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.data)
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
    const dialogRef = this.dialog.open(EmpLeaveCardDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        this.getApprovedLeaves();
      // this.reLoad();

        console.log("Dialog output:", data);
      }
    );
   }
   reLoad(){
    this.router.navigate([this.router.url])
    }

}
