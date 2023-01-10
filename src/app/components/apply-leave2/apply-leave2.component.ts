import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HolidayService } from 'src/app/services/holidays/holiday.service';
import { LeaveService } from 'src/app/services/Leave/leave.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-apply-leave2',
  templateUrl: './apply-leave2.component.html',
  styleUrls: ['./apply-leave2.component.css']
})
export class ApplyLeave2Component implements OnInit {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  from_date: any;
  to_date: any;
  current_user
  err_msg
  from
  to: any;
  userList;
  userVar 
  count = 0
  empId;
  sessionUsername ;
  leave_bal;
  leave : any;
  errors: "";
  minDate = new Date();
  maxDate ="2023-12-31";
  date_ = "2023-01-16" 
  gender
  leaveType
  noOfDays
  lop
  leavesList
  myHolidayDates =[
    new Date("2023-01-16"),
    new Date("2023-01-26"),
    new Date("2023-04-07"),
    new Date("2023-04-14"),
    new Date("2023-05-01"),
    new Date("2023-08-15"),
    new Date("2023-10-02"),
    new Date("2023-10-23"),
    new Date("2023-11-13"),
    new Date("2023-12-25"),
  
];
holidays_list

  holidays_arr:any[]
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
   // const time = d.getTime();
    const date = this.convertDate(d || new Date())
    // console.log(typeof date +" "+ typeof this.date_)
    // console.log( date +" "+  this.date_)
    // console.log(date===(this.date_));
    // console.log((d || new Date()).getFullYear())
    // console.log(this.iswithinrange("2023-01-13" ,"2023-01-12","2023-01-18" ))
    return (
      (day !== 0 && day !== 6) && 
      (!this.holidays_list.find(x=>this.convertDate(x.holidayDate || new Date()) ===date)) &&
      (!this.leavesList.find(x=>this.convertDate(x.fromDate || new Date()) ===date)) &&
      (!this.leavesList.find(x=>this.convertDate(x.toDate || new Date()) ===date)) &&
      (!this.leavesList.find(x=>this.iswithinrange(date ,x.fromDate,x.toDate ) ) )


       );
  };

  daysWithinRange(from:Date, to:Date){

  }

  iswithinrange(test, from, to){
    let test1 = new Date(test)
    let from1 =  new Date(from)
    let to1 =  new Date(to)
    //console.log(typeof test, typeof test1)
    if(test1 >= from1 && test1 <= to1){
      console.log("true" ,test1,test1.getUTCDate())
      return true
    }
    else
    return false
  }


  dateClass = (d: Date) => {
    // const date = d.getDate();
    const date = this.convertDate(d || new Date())
    return (this.myHolidayDates.find(x=>this.convertDate(x || new Date()) === date)) ? 'example-custom-date-class' : undefined;
  }
  constructor(private fb: FormBuilder, private leaveService : LeaveService,
    private route: ActivatedRoute,
    private router: Router,private userService : UserService,
    private holidayService:HolidayService
    ) {
      this.getholidays();
      this.sessionUsername = sessionStorage.getItem("fullName");
      this.empId = sessionStorage.getItem("empId")
      this.getUser(sessionStorage.getItem('userId'))
      // this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }
 // fromDate toDate
  ngOnInit(): void {
    console.log("ngonint")
    
    this.getUserList();
    this.getAppliedLeavesDate();
  // this.getHolidayList2()
    document.getElementById("failDiv").classList.add("display-none")
    document.getElementById("applyLeaveDiv").classList.remove("display-none")
    document.getElementById("successDiv").classList.add("display-none")
    this.sessionUsername = sessionStorage.getItem("fullName");
    this.empId = sessionStorage.getItem("empId")
    this.getUser(sessionStorage.getItem('userId'))
    // for(let user in this.userList){
    //   if(user['userId'] == sessionStorage.getItem('id')){
    //     this.current_user = user;
    //     this.gender = user['gender']
    //     console.log(this.gender)
    //     break;
    //   }
    //   else{
    //     console.log(user['userId'])
    //   }
       
    // }
    
    // this.loginId = sessionStorage.getItem("userName");

    // let ele = document.getElementById("name");
    // console.log(this.userList)
    // ele.textContent = this.getUsername()
    
  }
  getUser(id){
    this.userService.getUserById(id).subscribe(
      data => {
        this.current_user = data;
        this.gender = data['gender']
        this.leave_bal = data['leave_bal']
        console.log(this.leave_bal)
      },
      err =>{
        alert("No user With this Id : "+ err.message);
      }
    )
  }
 
  getholidays(){
    this.holidayService.getHolidayList().subscribe(
      data =>{
        this.holidays_list = data
        return data
      },
      err =>{
        console.log("error in retrieving holidays: ",err)
      }
    )
  }
  getUserList(){
     this.userService.getAllUser().subscribe(
      data => {
        this.userList = data;
       // for()
      
        console.log(data)     
      },
      err => {
        console.log("Error:" ,err)
      }
    );
  }
  getAppliedLeavesDate(){
    this.leaveService.getPendingApprovedLeavesByUser(sessionStorage.getItem('userId')).subscribe(
      data =>{
        this.leavesList = data
        console.log(data)
      },
      err =>{
        console.log(err.message)
      }
    )
  }


  date1(event) {
    // var convertDate = new Date(event.target.value).toDateString().substring(0,10);
  
    var convertDate = new Date(event.target.value).toISOString().substring(0, 10);
    this.applyLeaveForm.get('fromDate').setValue(convertDate, {
      onlyself: true,
    });
    this.from = this.applyLeaveForm.get('fromDate').value
    console.log("from date1 ", this.applyLeaveForm.get('fromDate').value)
  } 
  date2(event) {
    var convertDate = new Date(event.target.value).toISOString().substring(0, 10);
    this.applyLeaveForm.get('toDate').setValue(convertDate, {
      onlyself: true,
    });
    this.to = this.applyLeaveForm.get('toDate').value
  } 
  applyLeaveForm: FormGroup = this.fb.group({
    
    fromDate: ['', [Validators.required,]],
    toDate: ['', [Validators.required,]],
    leaveType: ['', [Validators.required]],
    //leaveReason: ['', ], //pattern="[a-zA-Z]+" ng-pattern-restrict
    //userId: ['', [Validators.required]], //Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}'),Validators.maxLength(10),Validators.minLength(10)  
  });

 onSubmit(){
  this.errors = ""
    console.log("in side submit  errors", this.errors)
 if (this.validForm()) {
   console.log("in side valid",this.form['fromDate'].value)
    this.from_date = this.convertDate(this.form['fromDate'].value)
    this.to_date = this.convertDate(this.form['toDate'].value)
    this.leaveType =   this.form['leaveType'].value,
    this.leave = {
      fromDate: this.convertDate(this.form['fromDate'].value),//this.from,
      toDate:  this.convertDate(this.form['toDate'].value), //this.to,
      leaveType: this.form['leaveType'].value, //moment().format('YYYY-MM-DDThh:mm:ssZ'),
      // leaveReason: this.form['leaveReason'].value,       
      userRef:{
        //userId:this.form['userId'].value
        userId : sessionStorage.getItem('userId')
      } 
    }        
    console.log("Before Apply leave submit",this.leave)
    this.applyLeave();
    this.reset1();
  
  } else {
    console.log("Invalid Form",this.applyLeaveForm.value)
    this.validateAllFormFields(this.applyLeaveForm); //{7}
  }
   /* Date */
 
} 
validForm(){
  if(this.form['fromDate'].value === ''  || this.form['toDate'].value=== '' ||
  this.form['leaveType'].value=== '' || 
  this.form['fromDate'].value == null  || this.form['toDate'].value == null ||
  this.form['leaveType'].value== null){
    console.log("False From: "+this.form['fromDate'].value +" To: "+this.form['toDate'].value+" leaveType: "
    +this.form['leaveType'].value)
    return false;
  }
   
  else{
    console.log(" True From: "+this.form['fromDate'].value +" To: "+this.form['toDate'].value+" leaveType: "
    +this.form['leaveType'].value)
    return true;
  }
  
}
 
  convertDate(dateObj){
    var date = new Date(dateObj);
    var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];

  //console.log(dateString);
  return(dateString);
  }
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }    
  get form(){
    return this.applyLeaveForm.controls;
  }

  applyLeave(){
    console.log("in side applyleave")
    this.leaveService.applyLeave(this.leave).subscribe(
      data=>{
        document.getElementById("failDiv").classList.add("display-none")
        document.getElementById("applyLeaveDiv").classList.add("display-none")
        document.getElementById("successDiv").classList.remove("display-none")
        console.log(data);
        this.noOfDays = data['noOfDays'];
        this.lop = data['lop']
        //alert("Applied Leave Successfully")
        return data;
      },      //successDiv failDiv applyLeaveDiv
      err => {
        document.getElementById("failDiv").classList.remove("display-none")
        document.getElementById("applyLeaveDiv").classList.add("display-none")
        document.getElementById("successDiv").classList.add("display-none")

        this.errors = err.error.message
       // alert(err.error.message)
        this.err_msg = err.error.message
        console.log("Error from Vs code : ",err.error.message)
      }
    ) // alert("Employee added Successfully")
  }
  public errorHandling = (control: string, error: string) => {
    return this.applyLeaveForm.controls[control].hasError(error);
  }
  // submitForm() {
  //   console.log(this.createUserForm.value)
  // }
  reset1(){
  // this.applyLeaveForm.reset();
     
    this.form['fromDate'].setValue('') 
    this.form['toDate'].setValue('') 
    this.form['leaveType'].setValue('')
    this.form['fromDate'].updateValueAndValidity();
    this.form['toDate'].updateValueAndValidity();
    this.form['leaveType'].updateValueAndValidity();

    Object.keys(this.applyLeaveForm.controls).forEach(key => {
      this.applyLeaveForm.get(key).setErrors(null) ;
    });
  
  }
  newLeave(){
    document.getElementById("failDiv").classList.add("display-none")
    document.getElementById("applyLeaveDiv").classList.remove("display-none")
    document.getElementById("successDiv").classList.add("display-none")
    document.getElementById("clearBtn").click();
    this.reLoad();
  }

  leaveApplication(){
    this.router.navigate(['employee-view'])
  }
  reLoad(){
    this.router.navigate([this.router.url])
  }
}
