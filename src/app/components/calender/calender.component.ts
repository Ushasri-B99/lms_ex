import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HolidayService } from 'src/app/services/holidays/holiday.service';
import { CreateEmpComponent } from '../Employee/create-emp/create-emp.component';
import { HolidaysDialogeComponent } from '../holidays-dialoge/holidays-dialoge.component';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  constructor(private holidayService: HolidayService,public dialog: MatDialog,private router : Router) { this.getHolidaysList();}
  holidayList;
  holidayList2;
  length_
  count = 4
  ngOnInit(): void {
    console.log("calender oninit")

   
    this.getHolidaysList1();
    console.log("After getHolidaysList1")


  }
  today_date = new Date();
  today_date_con = this.convertDate(this.today_date)
  // today_date_con = "2023-01-17"
  getHolidaysList1(){
    console.log("getHolidaysList1: length ",this.length_)
    let temp = this.length_;

    while(temp>0){
      if(this.today_date < this.holidayList[temp]){
        this.holidayList2.push(this.holidayList[temp])
      }
      else
        console.log("less date",this.holidayList[temp])
      temp--
    }
  }
  @ViewChild('show') myDiv: ElementRef<HTMLElement>;

triggerFalseClick() {
    let el: HTMLElement = this.myDiv.nativeElement;
    console.log("trigger")
    el.click();
}
  increaseCount(){
    this.count++
  }
  convertDate(dateObj){
    var date = new Date(dateObj);
    var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];

  //console.log(dateString);
  return(dateString);
  }
  getHolidaysList(){
    console.log("getHolidaysList: length ",this.length_)

    this.holidayService.getHolidayList().subscribe(
      data => {
        this.holidayList = data;
        this.length_ = this.holidayList.length
        console.log(data)
      },
      err =>{
        console.log(err)
      }
    )
  }
  showHolidays(){
    const dialogRef = this.dialog.open(HolidaysDialogeComponent);
    dialogRef.afterClosed().subscribe(result => {    
      this.reLoad();   
    });
  }
  reLoad(){
    this.router.navigate([this.router.url])
  }

}
