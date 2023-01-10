import { Component,Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HolidayService } from 'src/app/services/holidays/holiday.service';
import { AddHolidaysComponent } from '../add-holidays/add-holidays.component';

@Component({
  selector: 'app-update-holidays',
  templateUrl: './update-holidays.component.html',
  styleUrls: ['./update-holidays.component.css']
})
export class UpdateHolidaysComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
 
  minDate ="2023-01-01 "
  maxDate ="2023-12-31";
  
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // const date = this.convertDate(d || new Date())
    return ((day !== 0 && day !== 6) );
  };

  constructor(private fb: FormBuilder, private holidayService : HolidayService,
    private router: Router,private dialogRef: MatDialogRef<UpdateHolidaysComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      //this.rowData = data;
      this.holiday_id = data.holidayId 
      console.log("holidayid: constructoer",data)
    }

  ngOnInit(): void {
    console.log("holidayid: ",this.holiday_id)
  }
  holiday_id
  holidayObj
  holidayForm: FormGroup = this.fb.group({
    holidayName: ['', [Validators.required,Validators.maxLength(20),Validators.minLength(5)] ], //pattern="[a-zA-Z]+" ng-pattern-restrict
    holidayDate: ['', [Validators.required,]], 
    
  });

  updateHoliday(){
    // console.log("in side submit  errors", this.errors)
 if (this.validForm()) {
  //  console.log("in side valid",this.form['fromDate'].value)
    this.holidayObj = {
      holidayName: this.form['holidayName'].value,//this.from,
      holidayDate:  this.convertDate(this.form['holidayDate'].value), //this.to,
      holidayId :    this.holiday_id
    }        
    this.update();
    this.reset1();
  
  } else {
    console.log("Invalid Form",this.holidayForm.value)
    this.validateAllFormFields(this.holidayForm); //{7}
  }
   /* Date */
 
} 
validForm(){
  if(this.form['holidayName'].value === ''  || this.form['holidayDate'].value=== '' ||
  this.form['holidayName'].value == null  || this.form['holidayDate'].value == null){
    console.log("False From: "+this.form['holidayDate'].value +" To: "+this.form['holidayName'].value)
    return false;
  }  
  else{
    console.log(" True From: "+this.form['holidayDate'].value +" To: "+this.form['holidayName'].value)
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
    return this.holidayForm.controls;
  }

  update(){
    console.log("in side applyleave")
    this.holidayService.addHoliday(this.holidayObj).subscribe(
      data =>{
        console.log("Successfully add holiday: ",data)
        this.dialogRef.close()
        this.reLoad();
      },
      err =>{
        console.log("Error while adding holiday: ",err)

      }
    )
  }
  public errorHandling = (control: string, error: string) => {
    return this.holidayForm.controls[control].hasError(error);
  }
  
  reset1(){
     
    this.form['holidayName'].setValue('') 
    this.form['holidayDate'].setValue('') 

    this.form['holidayName'].updateValueAndValidity();
    this.form['holidayDate'].updateValueAndValidity();

    Object.keys(this.holidayForm.controls).forEach(key => {
      this.holidayForm.get(key).setErrors(null) ;
    });
  
  }

  reLoad(){
    this.router.navigate([this.router.url])
  }
}


