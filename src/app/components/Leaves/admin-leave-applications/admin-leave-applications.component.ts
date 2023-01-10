import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { LeaveService } from 'src/app/services/Leave/leave.service';

@Component({
  selector: 'app-admin-leave-applications',
  templateUrl: './admin-leave-applications.component.html',
  styleUrls: ['./admin-leave-applications.component.css']
})
export class AdminLeaveApplicationsComponent implements OnInit{
  allLeaves:any;
  allLeavesCountVar:number;

  pendingLeavesVar:any;
  pendingLeavesCount:number

  rejectLeaves:any;
  rejectLeavesCountVar:number

  approvedLeavesVar:any;
  approvedLeavesCountVar:number


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
  leavesInRangeVar:any;
  constructor(private fb: FormBuilder, private breakpointObserver: BreakpointObserver, 
    private renderer: Renderer2, private host: ElementRef,
    private leaveService: LeaveService) {}
  ngOnInit(): void {
    this.leaveService.getAllLeaveDetails().subscribe(
      data => {
        this.allLeaves = data
        this.allLeavesCountVar = data.length;
      },
      err =>{
        this.allLeavesCountVar = 0;
        console.log(err)
      }
    );
    // Approved Leaves

    this.leaveService.getApprovedLeaves().subscribe(
      data => {
        this.approvedLeavesVar = data
        this.approvedLeavesCountVar = data.length;
      },
      err =>{
        this.approvedLeavesCountVar = 0;
        console.log(err)
      }
    );

    this.leaveService.getPendingLeaves().subscribe(
      data => {
        this.pendingLeavesVar = data
        this.pendingLeavesCount = data.length;
      },
      err =>{
        this.pendingLeavesCount = 0;
        console.log(err)
      }
    );
    this.leaveService.getRejectedLeaves().subscribe(
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
    // this.allLeavesTempRef?.nativeElement.
  //pendingTabTempRef approvedTabTempRef  allLeavesTabTempRef  rejectedTabTempRef
  // this.renderer.removeClass(this.allLeavesTabTempRef,"display-none")
  // this.renderer.addClass(this.pendingTabTempRef,"display-none")
  // this.renderer.addClass(this.approvedTabTempRef,"display-none")
  // this.renderer.addClass(this.rejectedTabTempRef,"display-none")
  this.ngOnInit();

    document.getElementById("all").classList.remove("display-none");
    document.getElementById("pending").classList.add("display-none");
    document.getElementById("reject").classList.add("display-none");
    document.getElementById("approve").classList.add("display-none");

    // this.pendingTabTempRef?.nativeElement.classList.add("display-none");
    // this.approvedTabTempRef?.nativeElement.classList.add("display-none");
    // this.rejectedTabTempRef?.nativeElement.classList.add("display-none")
  }
  pendingLeaves(){
    this.ngOnInit();
    document.getElementById("all").classList.add("display-none");
    document.getElementById("pending").classList.remove("display-none");
    document.getElementById("reject").classList.add("display-none");
    document.getElementById("approve").classList.add("display-none");
  }

  approvedLeaves(){
  this.ngOnInit();
  document.getElementById("all").classList.add("display-none");
  document.getElementById("pending").classList.add("display-none");
  document.getElementById("reject").classList.add("display-none");
  document.getElementById("approve").classList.remove("display-none");
  }

  rejectedLeaves(){
    this.ngOnInit();
    document.getElementById("all").classList.add("display-none");
    document.getElementById("pending").classList.add("display-none");
    document.getElementById("reject").classList.remove("display-none");
    document.getElementById("approve").classList.add("display-none");
  }
  leavesInRangeForm: FormGroup = this.fb.group({   
    fromDate: ['', [Validators.required,]],
    toDate: ['', [Validators.required,]],  
  });
  submit(from, to){

  }
  minDate = new Date();
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
  // leavesInRange(leavesInRangeForm :{value:any;}){
  //    // this.leavesinrangeData?.nativeElement.classList.add("display-none")
  //     var fromDate = leavesInRangeForm.value.fromDate.toString()
  //     var toDate = leavesInRangeForm.value.toDate.toString()
  //     console.log("Submit: ",leavesInRangeForm.value.fromDate.toString())
  //     //this.leavesInRange1();
  //     this.leaveService.leavesInRange(fromDate,toDate).subscribe((data) => {this.leavesInRangeVar = data}, 
  //     (error) =>{console.log("error")})
  //     this.leavesVar = true
  //     this.leavesinrangeData?.nativeElement.classList.remove("display-none")
  
  //   }
    
    public errorHandling = (control: string, error: string) => {
      return this.leavesInRangeForm.controls[control].hasError(error);
    }
 
}
