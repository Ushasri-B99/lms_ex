import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HolidayService {


  private baseUrl ="http://localhost:9091/lms/";
  constructor(private http: HttpClient) { }
/*
  @PostMapping(value="/createUser")
	public  User createUser(@RequestBody User user)throws CustomException {
		if(user != null)
			return adminService.createUser(user);
		else
			throw new CustomException("Please Enter user details");
	} 
  */
 getHolidayList() : Observable<Object>{
  return this.http.get(`${this.baseUrl}`+'admin/holidayList');
 }

 addHoliday(holidayObj){
	return this.http.post(`${this.baseUrl}`+'admin/add-holiday',holidayObj);
 }

 updateHoliday(holidayObj){
	return this.http.put(`${this.baseUrl}`+'admin/update-holiday',holidayObj);
 }

 deleteHoliday(holidayid){
	return this.http.delete(`${this.baseUrl}`+'admin/delete-holiday',holidayid);

 }
 /*
 @PutMapping(value="/update-holiday")
	public Holiday updateHoliday(@RequestBody Holiday holiday ) throws CustomException {
		
		String isHoliday = adminService.isHolidayPresent(holiday);
		if(isHoliday.equalsIgnoreCase("false"))
			throw new CustomException("There is no holiday with this id : "+holiday.getHolidayId());
		else if(holiday.getHolidayDate().getDayOfWeek().toString().equalsIgnoreCase("SUNDAY"))
			throw  new CustomException("Entered Holiday-Date is Sunday "+holiday.getHolidayDate());
		else if(holiday.getHolidayDate().getDayOfWeek().toString().equalsIgnoreCase("SATURDAY"))
			throw new CustomException("Entered Holiday-Date is Saturday " +holiday.getHolidayDate());
		else
			return adminService.updateHoliday(holiday);
		
	}
	

	//public abstract Holidays addHoliday(Holidays holidays);

	@DeleteMapping("/delete-all-holiday")
	public void deleteHolidays() {
		adminService.deleteAllHolidays();
	}
	
	@DeleteMapping("/delete-holiday")
	public void deleteHolidayByid(@PathVariable int id) {
		adminService.deleteAllHolidays();
	}

 /*
 @PostMapping(value="/add-holiday")
	public Holiday addHoliday(@RequestBody Holiday holiday ) throws CustomException {
		
		String isHoliday = adminService.isHolidayPresent(holiday);
		if(isHoliday.equalsIgnoreCase("true"))
			throw new CustomException("This holiday is already added");
		else if(holiday.getHolidayDate().getDayOfWeek().toString().equalsIgnoreCase("SUNDAY"))
			throw  new CustomException("Entered Holiday-Date is Sunday "+holiday.getHolidayDate());
		else if(holiday.getHolidayDate().getDayOfWeek().toString().equalsIgnoreCase("SATURDAY"))
			throw new CustomException("Entered Holiday-Date is Saturday " +holiday.getHolidayDate());
		else
			return adminService.addHoliday(holiday);
		
	}
 /*
 	@PostMapping(value="/add-holidays-list")
	public List<Holiday> addHolidayList(@RequestBody List<Holiday> holidayList) throws CustomException {
		for(Holiday holiday: holidayList) {
			String isHoliday = adminService.isHolidayPresent(holiday);
			if(!isHoliday.equalsIgnoreCase("false"))
				throw new CustomException(isHoliday);
			if(holiday.getHolidayDate().getDayOfWeek().toString().equalsIgnoreCase("SUNDAY"))
				throw  new CustomException("Entered Holiday-Date is Sunday "+holiday.getHolidayDate());
			else if(holiday.getHolidayDate().getDayOfWeek().toString().equalsIgnoreCase("SATURDAY"))
				throw new CustomException("Entered Holiday-Date is Saturday " +holiday.getHolidayDate());
		}
		return adminService.addHolidaysList(holidayList);
	}
	

	//public abstract Holidays addHoliday(Holidays holidays);

	@DeleteMapping("/delete-holiday")
	public void deleteHolidays() {
		adminService.deleteAllHolidays();
	}
	
	@GetMapping(value = "/holidayList")
	public List<Holiday> holidayList(){
		return adminService.getAllHolidayList();
	}
 */
}
