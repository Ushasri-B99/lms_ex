import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveService } from 'src/app/services/Leave/leave.service';

/*
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
*/
  

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css'],
  /*
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
  */
})
export class ApplyLeaveComponent implements OnInit {

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  from: any;
  to: any;

  leave : any;
  errors: any;
  minDate = new Date();
  myHolidayDates = [
    new Date("1/16/2023"),
    new Date("1/26/2023"),
    new Date("4/7/2023"),
    new Date("4/14/2023"),
    new Date("5/1/2023"),
    new Date("8/15/2023"),
    new Date("10/2/2023"),
    new Date("10/23/2023"),
    new Date("11/13/2023"),
    new Date("12/25/2023")
];
//  MY_DATE_FORMAT = {
//   parse: {
//     dateInput: 'MM/DD/YYYY', // this is how your date will be parsed from Input
//   },
//   display: {
//     dateInput: 'MM/DD/YYYY', // this is how your date will get displayed on the Input
//     monthYearLabel: 'MMMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY'
//   }
// };
// myHolidayFilter = (d: Date): boolean => {
// // let   t = new Date();
// const time=d.getTime();
// return !this.myHolidayDates.find(x=>x.getTime()==time);
// }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    // if(day !== 0 && day !== 6){
    //   for(let d in this.myHolidayDates){
    //     if(day !=== )
    //   }
    // }
    return day !== 0 && day !== 6;
  };
  constructor(private fb: FormBuilder, private leaveService : LeaveService,private route: ActivatedRoute,
    private router: Router) {

  }
  ngOnInit(): void {
   
  }  
//   dateClass = (d: Date) => {
//     const date = d.getDate();
//     return (date === 1 || date === 20) ? 'example-custom-date-class' : undefined;
// }
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
    leaveReason: ['', ], //pattern="[a-zA-Z]+" ng-pattern-restrict
    userId: ['', [Validators.required]], //Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}'),Validators.maxLength(10),Validators.minLength(10)  
  });
  
  onSubmit(){
    console.log("in side submit")
  if (this.applyLeaveForm.valid) {
    console.log("in side valid")

    this.leave = {
      fromDate: this.from,
      toDate:  this.to,
      leaveType: this.form['leaveType'].value,
      leaveReason: this.form['leaveReason'].value, 
      
      userRef:{
        userId:this.form['userId'].value
      } 
    }
    console.log("Before Apply leave submit")

    this.applyLeave();
    this.reset1();
    // this.router.navigate(['createEmp']);
    
    
  } else {
    console.log("Invalid Form",this.form['toDate'].value)
    this.validateAllFormFields(this.applyLeaveForm); //{7}
  }
   /* Date */
 
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
        console.log(data);
      },      
      err => {
        this.errors = err
        console.log(err)
      }
    )
    

    // alert("Employee added Successfully")
  }


  // export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  //   const password = control.get('password');
  //   const confirmPassword = control.get('confirmPassword');
  
  //   return password && confirmPassword && password.value === confirmPassword.value ? { confirmPassword: true } : null;
  // };
 
  public errorHandling = (control: string, error: string) => {
    return this.applyLeaveForm.controls[control].hasError(error);
  }
  // submitForm() {
  //   console.log(this.createUserForm.value)
  // }
  reset1(){
    this.applyLeaveForm.reset(); 
    Object.keys(this.applyLeaveForm.controls).forEach(key => {
      this.applyLeaveForm.get(key).setErrors(null) ;
    });
  
  }

}
