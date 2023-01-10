import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddHolidaysComponent } from 'src/app/components/add-holidays/add-holidays.component';
import { HolidaysDialogeComponent } from 'src/app/components/holidays-dialoge/holidays-dialoge.component';
import { UpdateHolidaysComponent } from 'src/app/components/update-holidays/update-holidays.component';
import { HolidayService } from 'src/app/services/holidays/holiday.service';

@Component({
  selector: 'app-holidays-tab',
  templateUrl: './holidays-tab.component.html',
  styleUrls: ['./holidays-tab.component.css']
})
export class HolidaysTabComponent implements AfterViewInit, OnInit {
  
  displayedColumns = [ 'holidayId','holidayName', 'holidayDate', 'actions'];
 
  dataSource = new MatTableDataSource<any>();
  @ViewChild('holidayTbSort') holidayTbSort = new MatSort();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
   private holidayService: HolidayService,
    private dialog: MatDialog,
    private router: Router ){}

ngOnInit(): void {
  this.getHolidaysList();
  
}
holidayList
ngAfterViewInit(): void {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
  console.log(this.dataSource.data)
}
getRecord(row){
  console.log(row)
}
// constructor(private dialog: MatDialog) {}


getHolidaysList(){
  this.holidayService.getHolidayList().subscribe(
    data => {
      this.holidayList = data;
      this.dataSource.data = this.holidayList;
      console.log(data)
    },
    err =>{
      console.log(err)
    }
  )
}
addHoliday(){
  const dialogRef = this.dialog.open(AddHolidaysComponent);
  dialogRef.afterClosed().subscribe(result => {    
    this.reLoad();   
  });
}

showHolidays(){
  
}

reLoad(){
  this.router.navigate([this.router.url])
  }
  
  update(rowData) {
  console.log("while Clicking on dialog: ",rowData)
  const dialogConfig = new MatDialogConfig();
  dialogConfig.hasBackdrop = true; //default true
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = rowData
  console.log("After assign data to dialogConfig ",rowData)
 // this.dialog.open(LeaveDetailsCardComponent, dialogConfig);   
  const dialogRef = this.dialog.open(UpdateHolidaysComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(
    data => {
      this.getHolidaysList();
      this.reLoad()
    }
  );
 }



}
