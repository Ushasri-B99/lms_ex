import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Leave } from 'src/app/model/Leave/leave';
import { LeaveService } from 'src/app/services/Leave/leave.service';


@Component({
  selector: 'app-leaves-table',
  templateUrl: './leaves-table.component.html',
  styleUrls: ['./leaves-table.component.css']
})
export class LeavesTableComponent implements AfterViewInit,OnInit {
   displayedColumns = ['username', 'leaveReason','fromDate','toDate','createdAt','adminRemark','status','leaveType','noOfDays','lop'];
  

  private leaves: Leave[];
  dataSource = new MatTableDataSource<Leave>();
  @ViewChild('leaveTbSort') leaveTbSort = new MatSort();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor( private leaveService: LeaveService) { }
 

  ngOnInit(): void {
    this.leaveService.getAllLeaveDetails().subscribe(data => {
      this.leaves = data;
      this.dataSource.data = this.leaves;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.data)
  }
}
  