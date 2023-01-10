import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LeaveService } from './Leave/leave.service';
import { UserService } from './User/user.service';

@Injectable({
  providedIn: 'root'
})
export class DataSubService {
  employeeData = new BehaviorSubject(null);
  pendingLeavesData = new BehaviorSubject(null);
  approvedLeavesData = new BehaviorSubject(null);
  rejectedLeavesData = new BehaviorSubject(null);
  constructor(private userService : UserService ,private leaveService : LeaveService) { 
    this.userService.getAllUser().subscribe(
      data =>{
         this.employeeData.next(data);
      }
    )
  }

 

  getEmployeeData(){
    console.log(this.employeeData)
    return this.employeeData;
  }

  setEmployeeData(data){
    return this.employeeData.next(data);
  }

}
