import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LeaveDetailsCardComponent } from 'src/app/components/Leaves/leave-details-card/leave-details-card.component';
import { Leave } from 'src/app/model/Leave/leave';
import { LeaveService } from 'src/app/services/Leave/leave.service';


@Component({
  selector: 'app-employe-view-tab',
  templateUrl: './employe-view-tab.component.html',
  styleUrls: ['./employe-view-tab.component.css']
})
export class EmployeViewTabComponent 
implements AfterViewInit, OnInit {
  empId;
  id
  displayedColumns = ['username', 'leaveReason', 'fromDate', 'toDate', 'createdAt', 'leaveType', 'noOfDays', 'status', 'adminRemark', 'lop', 'actions'];
  private leavesList;
  
  dataSource = new MatTableDataSource<Leave>();
  @ViewChild('leaveTbSort') leaveTbSort = new MatSort();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private leaveService: LeaveService, 
    private dialog: MatDialog,
    private router: Router ){
      this.empId = sessionStorage.getItem('empId')
      this.id = sessionStorage.getItem('userId')

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
  this.leaveService.getleavesByUser(this.id).subscribe(data => {
    this.leavesList = data;
    this.dataSource.data = this.leavesList;
    // console.log("*********datasouce******** ",this.leaves.length)
    // if(this.leavesList.length == 0){
    //   // console.log("***************** ",this.leaves.length)
  
    //   document.getElementById("emptyDivl").classList.remove("display-none");
    //   document.getElementById("tableDivl").classList.add("display-none")
    // }
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
 applyLeave(){
  this.router.navigate(['applyLeave'])
 }

/*
implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EmployeViewTabItem>;
  dataSource: EmployeViewTabDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. 
  displayedColumns = ['id', 'name'];

  constructor() {
    this.dataSource = new EmployeViewTabDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  */
}
