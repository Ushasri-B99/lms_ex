
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

//import {FormControl} from '@angular/forms';
import {DateAdapter, ThemePalette} from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
export interface Subject {
  name: string;
}
// @Injectable()
// export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
//   constructor(private _dateAdapter: DateAdapter<D>) {}

//   selectionFinished(date: D | null): DateRange<D> {
//     return this._createFiveDayRange(date);
//   }

//   createPreview(activeDate: D | null): DateRange<D> {
//     return this._createFiveDayRange(activeDate);
//   }

//   private _createFiveDayRange(date: D | null): DateRange<D> {
//     if (date) {
//       const start = this._dateAdapter.addCalendarDays(date, -2);
//       const end = this._dateAdapter.addCalendarDays(date, 2);
//       return new DateRange<D>(start, end);
//     }

//     return new DateRange<D>(null, null);
//   }
// }
@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.css']
})
export class ExamplesComponent  {
  // visible = true;
  // selectable = true;
  // removable = true;
  // addOnBlur = true;
  // myForm: FormGroup|any;
  // @ViewChild('chipList', { static: true }) chipList: any;
  // GradeArray: any = ['8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'];
  // SubjectsArray: Subject[] = [];
  // readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // constructor(public fb: FormBuilder) {}
  // ngOnInit(): void {
  //   this.reactiveForm()
  // }
  // /* Reactive form */
  // reactiveForm() {
  //   this.myForm = this.fb.group({
  //     name: ['', [Validators.required]],
  //     email: ['', [Validators.required]],
  //     gender: ['Male'],
  //     dob: ['', [Validators.required]],
  //     grade: [''],
  //     subjects: [this.SubjectsArray]
  //   })
  // }
  // /* Date */
  //   date(e: { target: { value: string | number | Date; }; }) {
  //     var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
  //     this.myForm.get('dob').setValue(convertDate, {
  //       onlyself: true
  //     })
  //   }
  //     /* Add dynamic languages */
  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;
  //   // Add language
  //   if ((value || '').trim() && this.SubjectsArray.length < 5) {
  //     this.SubjectsArray.push({ name: value.trim() })
  //   }
  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }
  // /* Remove dynamic languages */
  // remove(subject: Subject): void {
  //   const index = this.SubjectsArray.indexOf(subject);
  //   if (index >= 0) {
  //     this.SubjectsArray.splice(index, 1);
  //   }
  // }  
  // /* Handle form errors in Angular 8 */
  // public errorHandling = (control: string, error: string) => {
  //   return this.myForm.controls[control].hasError(error);
  // }
  // submitForm() {
  //   console.log(this.myForm.value)
  // }
  
  //  loginForm = new FormGroup({
  //   uname: new FormControl([Validators.required,Validators.nullValidator]),
  //   password : new FormControl([Validators.nullValidator,Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')])
  //  })
  //   //////////////////// Password ////////////////////////
  // hide = true;
  //  ////////////////////////////Emaiiil Error Msg//////////////////////////
  //  email = new FormControl('', [Validators.required, Validators.email]);

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }
  // ///////////////////////////Date Picker Range///////////////////////////////
  // //No css and No js
  // // submit(){
  // //   var ex = this.password.value
  // //   console.log(ex)
  // // }

}

