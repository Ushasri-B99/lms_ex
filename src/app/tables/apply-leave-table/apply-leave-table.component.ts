import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplyLeaveComponent } from 'src/app/components/apply-leave/apply-leave.component';
import { EmpDetailsCardComponent } from 'src/app/components/emp-details-card/emp-details-card.component';
import { CreateEmpComponent } from 'src/app/components/Employee/create-emp/create-emp.component';
import { LeavesCardComponent } from 'src/app/components/leaves-card/leaves-card.component';
import { LeaveDetailsCardComponent } from 'src/app/components/Leaves/leave-details-card/leave-details-card.component';
import { Leave } from 'src/app/model/Leave/leave';
import { LeaveService } from 'src/app/services/Leave/leave.service';
import { ApplyLeaveTableDataSource, ApplyLeaveTableItem } from './apply-leave-table-datasource';

@Component({
  selector: 'app-apply-leave-table',
  templateUrl: './apply-leave-table.component.html',
  styleUrls: ['./apply-leave-table.component.css']
})



export class ApplyLeaveTableComponent implements AfterViewInit {
  displayedColumns = ['username', 'leaveReason', 'fromDate', 'toDate', 'createdAt', 'leaveType', 'noOfDays', 'status', 'adminRemark', 'lop', 'actions'];

  private leaves: Leave[];
  
  dataSource = new MatTableDataSource<Leave>();
  @ViewChild('leaveTbSort') leaveTbSort = new MatSort();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private leaveService: LeaveService, 
    private dialog: MatDialog ){}
  
    empId = sessionStorage.getItem('id');
  ngOnInit(){
    // this.dataSource = new ApplyLeaveTableDataSource(this.leaveService);

    this.getAllLeaves();
    
  }  
  getAllLeaves(){
    this.leaveService.getAllLeaveDetails().subscribe(
      data=>{
        this.leaves = data;
        this.dataSource.data = this.leaves;
         
      },
      err =>{

      }
    )
  }

  getAllLeavesByUser(){
    this.leaveService.getAllLeaveDetails().subscribe(
      data=>{
        this.leaves = data;
        this.dataSource.data = this.leaves;
         
      },
      err =>{

      }
    )
  }
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.data)
  }
  viewLeaves(leaveData){
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.hasBackdrop = true; //default true
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    dialogConfig.data = leaveData;
    const dialogRef = this.dialog.open(LeavesCardComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      data =>{
        this.getAllLeaves();
      },
      err =>{
        alert(err.message)
      }
    )

  }
  // constructor(private dialog: MatDialog) {}
 /*
  viewLeaves(rowData) {
    console.log("while Clicking on dialog: ",rowData)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true; //default true
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = rowData
    console.log("After assign data to dialogConfig ",rowData)
    this.dialog.open(LeaveDetailsCardComponent, dialogConfig);   
    const dialogRef = this.dialog.open(LeaveDetailsCardComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );
  }
  */
}

