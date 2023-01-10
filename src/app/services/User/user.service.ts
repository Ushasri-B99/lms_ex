import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/model/User1/user';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	user: User;
	private baseUrl = "http://localhost:9091/lms/";
	constructor(private http: HttpClient) { }

	createUser(emp: any): Observable<Object> {
		console.log("user Service")
		return this.http.post(`${this.baseUrl}` + 'admin/createUser', emp);
	}
	updateUser(emp: any) {
		return this.http.put(`${this.baseUrl}` + 'admin/update-user', emp);
	}
	getAllUser() {
		return this.http.get(`${this.baseUrl}admin/getAllUser`);
	}

	getAllUserP() {
		return this.http.get(`${this.baseUrl}admin/getAllUserp`);

	}
	login(id, pswd) { // user/login/{id}/{pswd}
		return this.http.get(`${this.baseUrl}/user/login/${id}/${pswd}`);
	}

	updatePassword(empPswd) { // user/login/{id}/{pswd}
		console.log("User Service", empPswd)
		return this.http.put(`${this.baseUrl}/user/update/`, empPswd);
		// return this.http.put(`${this.baseUrl}/user/update/${id}/${oldPswd}/${newPswd}`);
	}
	deleteUser(empId: number) {
		return this.http.delete(`${this.baseUrl}admin/deleteUserbyId/${empId}`);
	}
	
	getUserById(empId) {
		return this.http.get(`${this.baseUrl}/user/${empId}`);

	}
	getAllAdmin() {
		return this.http.get(`${this.baseUrl}/admin/getAdmin`);
	}
	adminLogin(loginObj) {
		// return this.http.get( `${this.baseUrl}/user/login/${id}/${pswd}`);
		console.log(loginObj)
		return this.http.post(`${this.baseUrl}admin/admin-login/`, loginObj);
	}
	updateAdmin(adminObj){
		return this.http.put(`${this.baseUrl}admin/update-admin/`, adminObj);
	}

	updateAdminPswd(adminPswd){
	return this.http.put(`${this.baseUrl}/user/update/`, adminPswd);
	}

	deleteAdmin(adminId){
		return this.http.delete(`${this.baseUrl}admin/deleteadminbyId/${adminId}`);
	}
	createAdmin(adminObj){
		return this.http.post(`${this.baseUrl}admin/add-admin/`,adminObj);

	}
	getAllUserByAdminIDDto(adminId) {
		return this.http.get(`${this.baseUrl}admin/getAllUserbyAdminIdDto/${adminId}`);
	}

	getAllUserByAdminID(adminId) {
		return this.http.get(`${this.baseUrl}admin/getAllUserbyAdminId/${adminId}`);
	}

/*
	@GetMapping(value="/getAllUserbyAdminIdDto/{id}")
	public List<UserDto> getAllUsersbyAdminIdDto(int id)throws CustomException {
		if(adminService.getAllUsersDtoByAdminId(id).size() != 0)
			return adminService.getAllUsersDtoByAdminId(id);
		else
			throw new CustomException("No Users were registered yet");
	}
	
	@GetMapping(value="/getAllUserbyAdminId/{id}")
	public List<User> getAllUsersbyAdminId(int id)throws CustomException {
		
		if(adminService.getAllUsersByAdminId(id).size() != 0)
			return adminService.getAllUsersByAdminId(id);
		else
			throw new CustomException("No Users were registered yet");
	}

	/*
	@PostMapping(value="/add-admin")
	public  Admin addAdmin(@RequestBody Admin admin) {
		return adminService.addAdmin(admin);
	}
	/*
	@PutMapping("update-admin")	
	public  Admin updateAdmin(@RequestBody Admin admin)throws CustomException {
		int temp = 0;
		for(Admin localAdminr : adminService.getAllAdmin()) {
			if(localAdminr.getAdmin_id() == admin.getAdmin_id()) {
				temp = 1;
				break;
			}
		}
		if(temp == 1)
			return adminService.updateAdmin(admin);
		else
			throw new CustomException("Admin not found! Enter correct details..");
	}

	@DeleteMapping(value="/deleteadminbyId/{id}")
	public void deleteAdminById(@PathVariable int id) throws CustomException {
		int temp = 0;
		for(Admin localAdminr : adminService.getAllAdmin()) {
			if(localAdminr.getAdmin_id() == id) {
				temp = 1;
				adminService.deleteUserById(id);
				break;
			}
	}
		if(temp == 0)
				throw new CustomException("There is no Admin with that id: " + id);
	}

	/*
	  @PostMapping(value="/createUser")
		public  User createUser(@RequestBody User user)throws CustomException {
			if(user != null)
				return adminService.createUser(user);
			else
				throw new CustomException("Please Enter user details");
		} 
	  */

	/*
	@GetMapping(value="/getAllUser")
	   public List<UserDto> getAllUsers()throws CustomException {
		   if(adminService.getAllUsersDto().size() != 0)
			   return adminService.getAllUsersDto();
		   else
			   throw new CustomException("No Users were registered yet");
	   }
	*/
	/*
	@PutMapping("update-user")	
		public  User updateUser(@RequestBody User user)throws CustomException {
			int temp = 0;
			for(User localUser : adminService.getAllUsers()) {
				if(localUser.getUserId() == user.getUserId()) {
					temp = 1;
					break;
				}
			}
			if(temp == 1)
				return adminService.updateUser(user);
			else
				throw new CustomException("User not found! Enter correct details..");
		}
	*/

	//   @PutMapping(value="/update/{id}/{oldPswd}/{newPswd}")
	//   public User login(@PathVariable int id,@PathVariable String oldPswd,@PathVariable String newPswd){
	// 	  return userService.updatePswd(id,oldPswd,newPswd);
	//   }


	/*
	@PutMapping("update-admin")	
	  public  Admin updateAdmin(@RequestBody Admin admin)throws CustomException {
		  int temp = 0;
		  for(Admin localAdminr : adminService.getAllAdmin()) {
			  if(localAdminr.getAdmin_id() == admin.getAdmin_id()) {
				  temp = 1;
				  break;
			  }
		  }
		  if(temp == 1)
			  return adminService.updateAdmin(admin);
		  else
			  throw new CustomException("Admin not found! Enter correct details..");
	  }
  
	  @DeleteMapping(value="/deleteadminbyId/{id}")
	  public void deleteAdminById(@PathVariable int id) throws CustomException {
		  int temp = 0;
		  for(Admin localAdminr : adminService.getAllAdmin()) {
			  if(localAdminr.getAdmin_id() == id) {
				  temp = 1;
				  adminService.deleteUserById(id);
				  break;
			  }
	  }
		  if(temp == 0)
				  throw new CustomException("There is no Admin with that id: " + id);
	  }
  /*
	@GetMapping(value="/getAdmin")
	  public List<Admin> getAllAdmin() throws CustomException{
		  if(adminService.getAllAdmin().size() != 0)
			  return adminService.getAllAdmin();
		  else
			  throw new CustomException("No Admin Data");
	  }
   
   /*
   public Leave applyLeave(@RequestBody Leave leave) throws CustomException {
	//int temp = 0;
	if(leave != null) {
	  for(Leave localLeave : getLeavesByUserId(leave.getUserRef().getUserId())) {
		if(localLeave.getFromDate().isEqual(leave.getFromDate()) && leave.getToDate().isEqual(localLeave.getToDate())){
		  //temp = 1;
		  throw new CustomException("You are already applied leave on these days");
		}
		else if(localLeave.getFromDate().isEqual(leave.getFromDate()) || leave.getToDate().isEqual(localLeave.getToDate()) 
			||localLeave.getFromDate().isEqual(leave.getToDate()) ||  localLeave.getToDate().isEqual(leave.getFromDate())
			) {
		  //temp = 1;
		  throw new CustomException("You are already applied leave on these days");
		}
		else if(( (leave.getFromDate().isAfter(localLeave.getFromDate()) ) && (leave.getFromDate().isBefore(localLeave.getToDate())) )) {
		  throw new CustomException("From-date is in the range of applied leave days");
		  }
		else if(( (leave.getToDate().isAfter(localLeave.getFromDate()) ) && (leave.getToDate().isBefore(localLeave.getToDate())) )) {
		  throw new CustomException("To-date is in the range of applied leave days");
		  }
		}
		return userService.applyLeave(leave);
	}
	else
	  throw new CustomException("Please Enter Leave Details");
  }
  @PostMapping(value="/applyLeave")
  */
	/*
	@GetMapping(value="/{userId}")
		public User getUserById(@PathVariable int userId) throws CustomException{
			if(userService.getUserDetails(userId) != null)
				return userService.getUserDetails(userId);
			else 
				throw new CustomException("There is no user with that Id: " + userId);
		}
	*/

	/*
	@GetMapping(value = "/admin-login")
	  public Admin login(@PathVariable String username, @PathVariable String paswd) throws CustomException {
		  int temp = 0;
		  Admin admin1 = null;
		  for(Admin admin : adminService.getAllAdmin()) {
			  if(admin.getName().equals(username) && admin.getPassword().equals(paswd)) {
				  temp = 1;
				  admin1 = admin;
				  break;
			  }
		  }
		  if(temp == 1)
			  return admin1;
		  else
			  throw new CustomException("Invalid username or password");
	  }
	*/

	/*
	@GetMapping(value="/getLeavesByUserId/{userId}")
	public List<Leave> getLeavesByUserId(@PathVariable int userId){
	  return userService.getUserLeavesList(userId);
	}
	*/

	/*
	@GetMapping(value="/{userId}")
	public User getUserById(@PathVariable int userId) throws CustomException{
	  if(userService.getUserDetails(userId) != null)
		return userService.getUserDetails(userId);
	  else 
		throw new CustomException("There is no user with that Id: " + userId);
	}
	*/

	/*
	@DeleteMapping(value="/deleteUserbyId/{id}")
		public void deleteUserById(@PathVariable int id) throws CustomException {
			int temp = 0;
			for(User localUser : adminService.getAllUsers()) {
				if(localUser.getUserId() == id) {
					temp = 1;
					adminService.deleteUserById(id);
					break;
				}
		}
			if(temp == 0)
					throw new CustomException("There is no user with that id: " + id);
		}
	  */


}
