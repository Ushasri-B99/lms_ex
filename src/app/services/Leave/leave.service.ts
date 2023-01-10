import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Leave } from 'src/app/model/Leave/leave';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LeaveService {
	leaves: Leave
	private baseUrl = "http://localhost:9091/lms";
	constructor(private http: HttpClient) { }

	/********************Leave ***********************/
	//@GetMapping(value="/leavesInRange/{from}/{to}")
	//leavesInRange(@PathVariable String from,@PathVariable String to){
	leavesInRange(from: any, to: any) {
		return this.http.get(`${this.baseUrl}/admin/leavesInRange/${from}/${to}`);
		// DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		// System.out.println(from);
		// LocalDate fromDate = LocalDate.parse(from,formatter);
		// LocalDate toDate = LocalDate.parse(to,formatter);
		// return adminService.leavesInRange(fromDate,toDate);
	}
	approveLeave(leaveId: number) {
		//return this.http.put((`${this.baseUrl}/admin/approveLeave/${leaveId}`),leaveId);
		return this.http.put(`${this.baseUrl}/admin/approveLeave/${leaveId}`, leaveId);
	}
	rejectLeave(leaveId: number) {
		//return this.http.put((`${this.baseUrl}/admin/approveLeave/${leaveId}`),leaveId);
		return this.http.put(`${this.baseUrl}/admin/rejectLeave/${leaveId}`, leaveId);
	}
	applyLeave(leave: any) {
		console.log("user Service")
		return this.http.post(`${this.baseUrl}` + '/user/applyLeave', leave);
	}
	getleavesByUser(empId) {
		return this.http.get(`${this.baseUrl}` + '/user/getLeavesByUserId/' + `${empId}`);
	}
	getAllLeaveDetails(): Observable<any> {
		// return this.http.get((`${this.baseUrl}/admin/getAllLeaves`)).subscribe((data) => this.data = data);
		return this.http.get((`${this.baseUrl}/admin/getAllLeaves`));
	}
	getPendingApprovedLeavesByAdmin(){
		return this.http.get((`${this.baseUrl}/admin/getPending-Approved`));
	}
	getPendingApprovedLeavesByUser(userId){
		return this.http.get((`${this.baseUrl}/user/getApprovedPendingList/${userId}`));
	}
/********************************************************* */
	getAllLeaveDetailsByAdminId(adminId): Observable<any> {
		// return this.http.get((`${this.baseUrl}/admin/getAllLeaves`)).subscribe((data) => this.data = data);
		return this.http.get((`${this.baseUrl}/admin/getAllLeavesByAdminId/${adminId}`));
	}
	getPendingLeavesByAdminId(adminId): Observable<any> {
		
		return this.http.get((`${this.baseUrl}/admin/getAllPendingListByAdminId/${adminId}`));

	}
	getApprovedLeavesByAdminId(adminId): Observable<any> {
		
		return this.http.get((`${this.baseUrl}/admin/getApprovedLeavesByAdminId/${adminId}`));
	}
	getRejectedLeavesByAdminId(adminId): Observable<any> {
		return this.http.get((`${this.baseUrl}/admin/getRejectedLeavesByAdminId/${adminId}`));
		
	}
	/*
	@GetMapping(value="/getAllLeavesByAdminId/{id}")
	public List<LeaveDto> getAllLeavesByAdminId(@PathVariable int id) throws CustomException{
		if(adminService.getAllLeavesByAdminIdDto(id) != null)
			return adminService.getAllLeavesByAdminIdDto(id);
		else
			throw new CustomException("No Leaves");
	}
	
	@GetMapping(value="/getAllPendingListByAdminId/{id}")
	public List<LeaveDto> getPendingLeavesByAdminId(@PathVariable int id) throws CustomException{
		if(adminService.getPendingLeavesByAdminId(id).size() != 0)
			return adminService.getPendingLeavesByAdminId(id);
		else
			throw new CustomException("There is no pending approvals");
	}
	


	@GetMapping(value="/getApprovedLeavesByAdminId/{id}")
	public List<LeaveDto> getApprovedLeavesByAdminId(@PathVariable int id) throws CustomException{
		if(adminService.getApprovedLeavesByAdminId(id).size() != 0)
			return adminService.getApprovedLeavesByAdminId(id);
		else
			throw new CustomException("There is no Approved Leaves ");
	}


	@GetMapping(value="/getRejectedLeavesByAdminId/{id}")
	public List<LeaveDto> getRejectedLeavesByAdminId(@PathVariable int id) throws CustomException{
		if(adminService.getRejectedLeavesByAdminId(id).size() != 0)
			return adminService.getRejectedLeavesByAdminId(id);
		else
			throw new CustomException("There is no Rejected Leaves ");
	}

	/*
	@GetMapping(value="/getApprovedPendingList/{id}")
	public List<LeaveDto> getApprovedPendingLeaves(@PathVariable int id)throws CustomException{
		List<LeaveDto> leaveList = null;
		if(userService.getPendingLeavesById(id).size() != 0)
			leaveList.addAll(userService.getPendingLeavesById(id)) ;
		if(userService.getApprovedLeavesById(id).size() != 0)
			leaveList.addAll(userService.getApprovedLeavesById(id)) ;
		return leaveList;
	}

	/*
	@GetMapping(value="/getPending-Approved")
	public List<LeaveDto> getPendingApprovedLeaves() throws CustomException{
		List<LeaveDto> leavesList = null;
		if(adminService.getApprovedLeaves().size() != 0 )
			leavesList.addAll(adminService.getApprovedLeaves());
		if(adminService.getPendingLeaves().size() != 0 )
			leavesList.addAll(adminService.getPendingLeaves());
		else
			throw new CustomException("There is no Approved Leaves ");
		return leavesList;
	}
*/
	getPendingLeaves(): Observable<any> {
		// if(adminService.getPendingLeaves().size() != 0)
		// 	return adminService.getPendingLeaves();
		// else
		// 	throw new CustomException("There is no pending approvals");
		return this.http.get((`${this.baseUrl}/admin/getAllPendingList`));

	}
	getApprovedLeaves(): Observable<any> {
		// if(adminService.getApprovedLeaves().size() != 0)
		// 	return adminService.getApprovedLeaves();
		// else
		// 	throw new CustomException("There is no Approved Leaves ");
		return this.http.get((`${this.baseUrl}/admin/getApprovedLeaves`));
	}
	getRejectedLeaves(): Observable<any> {
		return this.http.get((`${this.baseUrl}/admin/getRejectedLeaves`));
		// if(adminService.getRejectedLeaves().size() != 0)
		// 	return adminService.getRejectedLeaves();
		// else
		// 	throw new CustomException("There is no Rejected Leaves ");
	}
	getPendingLeavesByUser(id): Observable<any> {
		return this.http.get((`${this.baseUrl}/user/getAllPendingList/${id}`));

	}
	getApprovedLeavesByUser(id): Observable<any> {
		return this.http.get((`${this.baseUrl}/user/getApprovedLeaves/${id}`));
	}
	getRejectedLeavesByUser(id): Observable<any> {
		return this.http.get((`${this.baseUrl}/user/getRejectedLeaves/${id}`));
		
	}

	editLeaveReq(leaveObj){
		return this.http.put((`${this.baseUrl}/user/deleteLeaveReq/`),leaveObj);

	}

	deleteLeaveReq(id){
		return this.http.delete(`${this.baseUrl}/user/deleteLeaveReq/${id}`)
	}
	/*
	@DeleteMapping(value="/deleteLeaveReq/{id}")
	public void deleteLeave(@PathVariable int id) {
		 userService.deleteLeavReq(id);
	}
	
	@PutMapping(value="/editleaveReq")
	public Leave editLeave(@RequestBody Leave leave) {
		return userService.editLeavReq(leave);
	}

	/*
	@GetMapping(value="/getAllPendingList")
	public List<LeaveDto> getPendingLeaves(@PathVariable int id)throws CustomException{
		if(userService.getPendingLeavesById(id).size() != 0)
			return userService.getPendingLeavesById(id);
		else
			throw new CustomException("There is no pending Leaves");
	}
	
	@GetMapping(value="/getApprovedLeaves")
	public List<LeaveDto> getApprovedLeaves(@PathVariable int id) throws CustomException{
		if(userService.getApprovedLeavesById(id).size() != 0)
			return userService.getApprovedLeavesById(id);
		else
			throw new CustomException("There is no Approved Leaves ");
	}
	
	
	@GetMapping(value="/getRejectedLeaves")
	public List<LeaveDto> getRejectedLeaves(@PathVariable int id) throws CustomException{
		if(userService.getRejectedLeavesById(id).size() != 0)
		return userService.getRejectedLeavesById(id);
		else
			throw new CustomException("There is no Rejected Leaves ");
	}
*/
	//@GetMapping(value="/getAllLeaves")
	// usersList2(): Observable<Leave[]> {    
	// 	return this.http.get(`${environment.baseUrl}/users`).pipe(
	// 	  map((jsonArray: Object[]) =>  jsonArray.map(jsonItem => Leave.fromJson(jsonItem)))
	// 	);
	// }




	// usersList() {    
	//   this.http.get(`${environment.baseUrl}/users`).pipe(
	// 	map((jsonArray: Object[]) =>  jsonArray.map(jsonItem => this.leaves.fromJson(jsonItem)))
	//   ).subscribe((users: User[]) => { this.users = users; });

	//   return this.users;
	// }



	//@GetMapping(value="/getAllPendingList")


	//@GetMapping(value="/getApprovedLeaves")



	//@GetMapping(value="/getRejectedLeaves")


	// //@PutMapping(value="/approveLeave/{leaveId}/{adminRemark}")
	// public Leave approveLeave(@PathVariable int leaveId, @PathVariable String adminRemark) throws CustomException {
	// 	int temp = 0;
	// 	Leave leave  = null;
	// 	for(Leave localLeave : adminService.getAllLeavesByAdmin()) {
	// 		if(localLeave.getLeaveId() == leaveId) {
	// 			temp = 1;
	// 			if(localLeave.getStatus() == LeaveStatus.ACCEPTED)
	// 				throw new CustomException("This Leave Request is already approved");
	// 			else if(localLeave.getStatus() == LeaveStatus.REJECTED)
	// 				throw new CustomException("This Leave Request is already rejected");
	// 			else {
	// 				leave = localLeave;
	// 				break;
	// 			}
	// 		}
	// 	}
	// 	if(temp == 0)
	// 		throw new CustomException("There is no leave request with this id: " + leaveId);
	// 	else
	// 		return adminService.approveLeave(leave,adminRemark); 

	// }
	//   approveLeave(leaveId:number, adminRemark:String){
	//     return this.http.get((`${this.baseUrl}/admin/approveLeave/${leaveId}/${adminRemark}`));
	//   }

	/*
	  @PutMapping(value="/rejectLeave/{leaveId}/{adminRemark}")
	  public Leave rejectLeave(@PathVariable int leaveId, @PathVariable String adminRemark) throws CustomException {
		  int temp = 0;
		  Leave leave = null;
		  for(Leave localLeave :adminService.getAllLeavesByAdmin()) {
			  if(localLeave.getLeaveId() == leaveId) {
				  temp = 1;
				  if(localLeave.getStatus() == LeaveStatus.ACCEPTED)
					  throw new CustomException("This Leave Request is already approved");
				  else if(localLeave.getStatus() == LeaveStatus.REJECTED)
					  throw new CustomException("This Leave Request is already rejected");
				  else {
					  leave = localLeave;
					  break;
				  }
			  }
		  }
		  if(temp == 0)
			  throw new CustomException("There is no leave request with this id: " + leave.getLeaveId());
		  else
			  return adminService.rejectLeave(leave,adminRemark); 
	  	
	  }
  */
	// rejectLeave(leaveId : number, adminRemark: String ){
	//   return this.http.get((`${this.baseUrl}/admin/rejectLeave/${leaveId}/${adminRemark}`));
	// }


	/*
	@GetMapping(value="/getLeavesByUserId/{userId}")
	  public List<Leave> getLeavesByUserId(@PathVariable int userId){
		  return userService.getUserLeavesList(userId);
	  }
	*/



}


