import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HolidayService } from 'src/app/services/holidays/holiday.service';

@Component({
  selector: 'app-holidays-dialoge',
  templateUrl: './holidays-dialoge.component.html',
  styleUrls: ['./holidays-dialoge.component.css']
})
export class HolidaysDialogeComponent implements OnInit {

  constructor(private holidayService: HolidayService, private dialogRef: MatDialogRef<HolidaysDialogeComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
      // this.shouldSizeUpdate = data.shouldSizeUpdate 
    }
  holidayList
  private shouldSizeUpdate//=true;

  // constructor(private dialogRef: MatDialogRef<MyDialogComponent>,
  //             @Inject(MAT_DIALOG_DATA) data: any) {
  //     this.shouldSizeUpdate = data.shouldSizeUpdate;
  // }

  // ngOnInit() {
  //     if (this.shouldSizeUpdate) this.updateSize();
  // }

  updateSize() {
      this.dialogRef.updateSize("500px");
  }
  ngOnInit(): void {
    // if (this.shouldSizeUpdate)
     this.updateSize();

    this.getHolidaysList()
  }
  close_dial(){
    this.dialogRef.close();
  }
  getHolidaysList(){
    this.holidayService.getHolidayList().subscribe(
      data => {
        this.holidayList = data;
        // this.length_ = this.holidayList.length
        console.log(data)
      },
      err =>{
        console.log(err)
      }
    )
  }

}
