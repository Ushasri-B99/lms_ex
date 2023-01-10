import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplyLeaveComponent } from 'src/app/components/apply-leave/apply-leave.component';
import { LeaveDetailsCardComponent } from 'src/app/components/Leaves/leave-details-card/leave-details-card.component';
import { Leave } from 'src/app/model/Leave/leave';
import { LeaveService } from 'src/app/services/Leave/leave.service';

@Component({
  selector: 'app-leaves-in-range',
  templateUrl: './leaves-in-range.component.html',
  styleUrls: ['./leaves-in-range.component.css']
})
export class LeavesInRangeComponent  implements AfterViewInit,OnInit {
  displayedColumns = ['username', 'leaveReason', 'fromDate', 'toDate', 'createdAt', 'leaveType', 'noOfDays', 'status', 'adminRemark', 'lop', 'actions'];
  

  private allLeaves: Leave[];
  private approvedLeaves: Leave[];
  private rejectedLeaves: Leave[];
  private pendingLeaves: Leave[];
  dataSource = new MatTableDataSource<Leave>();
  @ViewChild('approveTbSort') approveTbSort = new MatSort();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor( private leaveService: LeaveService, private dialog: MatDialog,private router: Router) { }
 

  ngOnInit(): void {
   this.getApprovedLeaves();
  }
  getApprovedLeaves(){
      this.leaveService.getApprovedLeaves().subscribe(data => {
      this.approvedLeaves = data;
      this.dataSource.data = this.approvedLeaves;
      console.log("Approved Leaves")
      console.log(this.approvedLeaves)
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
    const dialogRef = this.dialog.open(LeaveDetailsCardComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        this.getApprovedLeaves();
        console.log("Dialog output:", data);
      }
    );
    //hasBackdrop: defines if the dialog should have a shadow backdrop, that blocks the user from clicking on the rest of the UI while the dialog is opened (default is true)
  
    // panelClass: adds a list of custom CSS classes to the Dialog panel
  
    // backdropClass: adds a list of custom CSS classes to the dialog backdrop
  
    // position: defines a starting absolute position for the dialog. For example, this would show the dialog in top left corner of the page, instead of in the center:
  }

/*
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ApprovedLeavesItem>;
  dataSource: ApprovedLeavesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. *
  displayedColumns = ['id', 'name'];

  constructor() {
    this.dataSource = new ApprovedLeavesDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  */
}
