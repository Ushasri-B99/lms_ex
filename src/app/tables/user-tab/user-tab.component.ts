import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroupDirective, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { EmpLeaveCardDetailsComponent } from 'src/app/components/emp-leave-card-details/emp-leave-card-details.component';
import { LeaveDetailsCardComponent } from 'src/app/components/Leaves/leave-details-card/leave-details-card.component';
import { Leave } from 'src/app/model/Leave/leave';
import { LeaveService } from 'src/app/services/Leave/leave.service';
import { ApprovedLeavesComponent } from '../approved-leaves/approved-leaves.component';
import { LeavesTable2Component } from '../leaves-table2/leaves-table2.component';
import { PendingLeavesComponent } from '../pending-leaves/pending-leaves.component';
import { RejectedLeavesComponent } from '../rejected-leaves/rejected-leaves.component';


@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css']
})
export class UserTabComponent implements OnInit,AfterViewInit{
	
	displayedColumns = ['username', 'leaveReason', 'fromDate', 'toDate', 'createdAt', 'leaveType', 'noOfDays', 'status', 'adminRemark', 'lop', 'actions'];		
	dataSource = new MatTableDataSource<any>();
	@ViewChild('approveTbSort') approveTbSort = new MatSort();
	  
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	
	fromDate
	toDate


	allLeaves:any;
	allLeavesCountVar:number;
  
	pendingLeavesVar:any;
	pendingLeavesCount:number
  
	rejectLeaves:any;
	rejectLeavesCountVar:number
  
	approvedLeavesVar:any;
	approvedLeavesCountVar:number

	leavesInRangeVar:any
	leavesInRangeCountVar : number
  
  
	/** Based on the screen size, switch from standard to one column per row */
	@ViewChild('cardTempRef') cardTempRef;
	@ViewChild('tableCardTempRef') tableCardTempRef : ElementRef | undefined;
	@ViewChild('allLeavesTempRef') allLeavesTempRef : ElementRef | undefined;
	@ViewChild('pendingLeavesTempRef') pendingLeavesTempRef : ElementRef |undefined;
	@ViewChild('approvedLeavesTempRef') approvedLeavesTempRef : ElementRef | undefined;
	@ViewChild('rejectedLeavesTempRef') rejectedLeavesTempRef : ElementRef | undefined;
  
	//pendingTabTempRef approvedTabTempRef  allLeavesTabTempRef  rejectedTabTempRef
	@ViewChild('pendingTabTempRef') pendingTabTempRef : ElementRef | undefined;
	@ViewChild('approvedTabTempRef') approvedTabTempRef : ElementRef | undefined;
	@ViewChild('allLeavesTabTempRef') allLeavesTabTempRef : ElementRef | undefined;
	@ViewChild('rejectedTabTempRef') rejectedTabTempRef : ElementRef | undefined;
  
	@ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
	empId
  id
  sessionUsername
  leave_bal
	constructor(private fb: FormBuilder, private breakpointObserver: BreakpointObserver, 
	  private renderer: Renderer2, private host: ElementRef,
	  private leaveService: LeaveService, private dialog: MatDialog,
	  private router: Router,
	  private pendingTable: PendingLeavesComponent,
	  private approveTable: ApprovedLeavesComponent,
	  private rejectTable: RejectedLeavesComponent,
	  private allLeavesTable: LeavesTable2Component) {
      this.empId = sessionStorage.getItem('empId')
      this.id = sessionStorage.getItem('userId')
	  this.sessionUsername = sessionStorage.getItem('fullName')
    }

	ngOnInit(): void {
	  this.leaveService.getleavesByUser(this.id).subscribe(
		data => {
		  this.allLeaves = data
		  // this.allLeavesCountVar = data.length;
		},
		err =>{
		  this.allLeavesCountVar = 0;
		  console.log(err)
		}
	  );
	  // Approved Leaves
  
	  this.leaveService.getApprovedLeavesByUser(this.id).subscribe(
		data => {
		  this.approvedLeavesVar = data
		  this.approvedLeavesCountVar = data.length;
		},
		err =>{
		  this.approvedLeavesCountVar = 0;
		  console.log(err)
		}
	  );
  
	  this.leaveService.getPendingLeavesByUser(this.id).subscribe(
		data => {
		  this.pendingLeavesVar = data
		  this.pendingLeavesCount = data.length;
		},
		err =>{
		  this.pendingLeavesCount = 0;
		  console.log(err)
		}
	  );
	  this.leaveService.getRejectedLeavesByUser(this.id).subscribe(
		data => {
		  this.rejectLeaves = data
		  this.rejectLeavesCountVar = data.length;
		},
		err =>{
		  this.rejectLeavesCountVar = 0;
		  console.log(err)
		}
	  )
	}
	cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
	  map(({ matches }) => {
		if (matches) {
		  return {
			columns: 1,
			miniCard: { cols: 1, rows: 1 },
			chart: { cols: 1, rows: 2 },
			table: { cols: 1, rows: 4 },
		  };
		}
  
		return {
		  columns: 4,
		  miniCard: { cols: 1, rows: 1 },
		  chart: { cols: 2, rows: 2 },
		  table: { cols: 4, rows: 4 },
		};
	  })
	);
	getAllLeaves(){
		this.ngOnInit();
		document.getElementById("allBtn").classList.add("button2")
		document.getElementById("pendingBtn").classList.remove("button2")
		document.getElementById("approvedBtn").classList.remove("button2")
		document.getElementById("rejectedBtn").classList.remove("button2")
  

		document.getElementById("all").classList.remove("display-none");
		document.getElementById("pending").classList.add("display-none");
		document.getElementById("reject").classList.add("display-none");
		document.getElementById("leavesinrangeId").classList.add("display-none");
		document.getElementById("approve").classList.add("display-none");

		//this.router.navigate(['/leaveapplications'])


	}
	pendingLeaves(){
	  this.ngOnInit();
	  document.getElementById("allBtn").classList.remove("button2")
	  document.getElementById("pendingBtn").classList.add("button2")
	  document.getElementById("approvedBtn").classList.remove("button2")
	  document.getElementById("rejectedBtn").classList.remove("button2")

	  document.getElementById("all").classList.add("display-none");
	  document.getElementById("pending").classList.remove("display-none");
	  document.getElementById("reject").classList.add("display-none");
	  document.getElementById("approve").classList.add("display-none");
	  document.getElementById("leavesinrangeId").classList.add("display-none");
	  //this.pendingTable.reLoad();
      //this.router.navigate(['/pendingTable'])


	}
  
	approvedLeaves(){
		this.ngOnInit();
		document.getElementById("allBtn").classList.remove("button2")
		document.getElementById("pendingBtn").classList.remove("button2")
		document.getElementById("approvedBtn").classList.add("button2")
		document.getElementById("rejectedBtn").classList.remove("button2")

		document.getElementById("all").classList.add("display-none");
		document.getElementById("pending").classList.add("display-none");
		document.getElementById("reject").classList.add("display-none");
		document.getElementById("approve").classList.remove("display-none");
		document.getElementById("leavesinrangeId").classList.add("display-none");

		//this.approveTable.reLoad();


	}
	// allBtn pendingBtn approvedBtn rejectedBtn button1 button2
	rejectedLeaves(){
	  this.ngOnInit();
	  document.getElementById("allBtn").classList.remove("button2")
	  document.getElementById("pendingBtn").classList.remove("button2")
	  document.getElementById("approvedBtn").classList.remove("button2")
	  document.getElementById("rejectedBtn").classList.add("button2")

	  document.getElementById("all").classList.add("display-none");
	  document.getElementById("pending").classList.add("display-none");
	  document.getElementById("reject").classList.remove("display-none");
	  document.getElementById("approve").classList.add("display-none");
	  document.getElementById("leavesinrangeId").classList.add("display-none");

		// this.rejectTable.reLoad();


	}
	rangeLeaves(){
		this.ngOnInit();
	  document.getElementById("all").classList.add("display-none");
	  document.getElementById("pending").classList.add("display-none");
	  document.getElementById("reject").classList.add("display-none");
	  document.getElementById("approve").classList.add("display-none");
	  document.getElementById("leavesinrangeId").classList.remove("display-none");
	//   this.reLoad()
	}
	leavesInRangeForm: FormGroup = this.fb.group({   
	  fromDate: ['', [Validators.required,]],
	  toDate: ['', [Validators.required,]],  
	});

	leavesInrangeSubmit(){	
		document.getElementById("allBtn").classList.remove("button2")
		document.getElementById("pendingBtn").classList.remove("button2")
		document.getElementById("approvedBtn").classList.remove("button2")
		document.getElementById("rejectedBtn").classList.remove("button2")
		
		if(this.validForm()){
			this.rangeLeaves();
			this.fromDate =  this.convertDate(this.form['fromDate'].value);//this.from,
			this.toDate =  this.convertDate(this.form['toDate'].value) //this.to,
		    this.getLeavesinrange(this.fromDate,this.toDate);
		}
		else{

		}
		
	}
	validForm(){
		if(this.form['fromDate'].value === ''  || this.form['toDate'].value=== '' ){
		  console.log("False From: "+this.form['fromDate'].value +" To: "+this.form['toDate'].value)
		  return false;
		}
		 
		else{
		  console.log(" True From: "+this.form['fromDate'].value +" To: "+this.form['toDate'].value)
		  return true;
		}
		
	  }

	getLeavesinrange(fromDate,toDate){
		let x = this.leaveService.leavesInRange(fromDate,toDate).subscribe(
			data =>{
				this.leavesInRangeVar = data
				this.dataSource.data = this.leavesInRangeVar;
				console.log("levaes:" ,data)
			
			},
			err =>{
				 alert("No  Leaves")
				 document.getElementById("emptyDivv3").classList.remove("display-none");
				 document.getElementById("tableDivv3").classList.add("display-none");
			}
		);
		// if(this.leavesInRangeVar.length == 0) {
		// 	alert("No  Leaves")
		// 	document.getElementById("emptyDivv3").classList.remove("display-none");
		// 	document.getElementById("tableDivv3").classList.add("display-none");
		// }
		// else 
		// 	console.log( this.leavesInRangeVar.size)
	}
	minDate = "2022-01-01";
	maxDate = "2023-12-31"
	myFilter = (d: Date | null): boolean => {
	  const day = (d || new Date()).getDay();
	  return day !== 0 && day !== 6;
	};
	convertDate(dateObj){
	  var date = new Date(dateObj);
	  var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
					  .toISOString()
					  .split("T")[0];
  
	console.log(dateString);
	return(dateString);
	}
	get form(){
		return this.leavesInRangeForm.controls;
	  }
	  
	  public errorHandling = (control: string, error: string) => {
		return this.leavesInRangeForm.controls[control].hasError(error);
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
			this.getLeavesinrange(this.fromDate,this.toDate);
			this.reLoad();
			console.log("Dialog output:", data);
		  }
		);
		 }

		ngAfterViewInit(): void {
		  this.dataSource.sort = this.sort;
		  this.dataSource.paginator = this.paginator;
		  console.log(this.dataSource.data)
		}
		reLoad(){
			this.router.navigate([this.router.url])
		  }
  }
  
