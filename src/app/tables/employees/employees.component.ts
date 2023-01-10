import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpDetailsCardComponent } from 'src/app/components/emp-details-card/emp-details-card.component';
import { CreateEmpComponent } from 'src/app/components/Employee/create-emp/create-emp.component';
import { LeaveDetailsCardComponent } from 'src/app/components/Leaves/leave-details-card/leave-details-card.component';
import { UpdateEmpDialogComponent } from 'src/app/components/update-emp-dialog/update-emp-dialog.component';
import { UpdateEmpComponent } from 'src/app/components/update-emp/update-emp.component';
import { Employee } from 'src/app/model/Employee/employee';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent{
  adminId
  users: any
  constructor(private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService
){
  this.adminId = sessionStorage.getItem('adminId')
  console.log(this.adminId,"In Constructor ")
}
displayedColumns = ['userId','empId', 'firstName', 'lastName',  'gender', 'email', 'role', 'phoneNumber', 'leave_bal','actions']//, 'adminId', 'adminName', 'leavesList', 'actions'];
//userId firstName lastName  gender email role phoneNumber leave_bal adminId adminName leavesList
dataSource = new MatTableDataSource<Employee>();
  @ViewChild('emptab') emptab = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

addEmp() {
  const dialogRef = this.dialog.open(CreateEmpComponent);
  dialogRef.afterClosed().subscribe(result => {
    this.getAllUsers();
    this.reLoad();
    console.log("Dialog result of create Employee: ",result);
  });
}
reLoad(){
  this.router.navigate([this.router.url])
}
getAllUsers(){
  this.userService.getAllUserByAdminID(this.adminId).subscribe(data => {
    this.users = data;
    this.dataSource.data = this.users;
    console.log(this.users)
 
  if(this.users.length == 0){
    // console.log("***************** ",this.leaves.length)

    document.getElementById("emptyDivl").classList.remove("display-none");
    document.getElementById("tableDivl").classList.add("display-none")
  }
},
err =>{
  // alert("No Pending Leaves")
  document.getElementById("emptyDivl").classList.toggle("display-none");
  document.getElementById("tableDivl").classList.toggle("display-none")

});

}
ngOnInit(): void {
  this.getAllUsers(); 
}

ngAfterViewInit(): void {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
  console.log(this.dataSource.data)
}


update(rowData){

  const dialogConfig = new MatDialogConfig();
  dialogConfig.hasBackdrop = true; //default true
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  // dialogConfig.data = rowData
  dialogConfig.data = { id:rowData.userId}
  console.log("After assign data to dialogConfig ",dialogConfig.data)
  //this.dialog.open(EmpDetailsCardComponent, dialogConfig);   
  const dialogRef = this.dialog.open(UpdateEmpDialogComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(
    data => {
      this.getAllUsers();
    this.reLoad();

      console.log("Dialog output:", data)
    }
  );
}

viewDetails(rowData) {
  console.log("while Clicking on dialog: ",rowData)

  const dialogConfig = new MatDialogConfig();
  dialogConfig.hasBackdrop = true; //default true
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = rowData
  console.log("After assign data to dialogConfig ",dialogConfig.data)
  //this.dialog.open(EmpDetailsCardComponent, dialogConfig);
     
  const dialogRef = this.dialog.open(EmpDetailsCardComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(
    data => {
      this.getAllUsers();
    this.reLoad();

      console.log("Dialog output:", data)
    }
  );
  }
  
//export class EmployeesComponent implements AfterViewInit {
  /*
  displayedColumns = ['username', 'leaveReason', 'fromDate', 'toDate', 'createdAt', 'leaveType', 'noOfDays', 'status', 'adminRemark', 'lop', 'actions'];
/*
  private emp: Employee[];
  
  dataSource = new MatTableDataSource<Employee>();
  @ViewChild('leaveTbSort') leaveTbSort = new MatSort();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private leaveService: LeaveService, 
    private dialog: MatDialog ){}

  
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
getRecord(row){
  console.log(row)
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

  //hasBackdrop: defines if the dialog should have a shadow backdrop, that blocks the user from clicking on the rest of the UI while the dialog is opened (default is true)

  // panelClass: adds a list of custom CSS classes to the Dialog panel

  // backdropClass: adds a list of custom CSS classes to the dialog backdrop

  // position: defines a starting absolute position for the dialog. For example, this would show the dialog in top left corner of the page, instead of in the center:
}
*/

}
