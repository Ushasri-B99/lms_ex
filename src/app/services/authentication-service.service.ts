import { Injectable, OnInit } from '@angular/core';
import { UserService } from './User/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService{ //implements OnInit{

  constructor(private userService: UserService) { 
    this.getAllUsers(); 
    this.getAdmin();
  }
  // ngOnInit(): void {
  //   this.getAllUsers();   
  // }
  admin
  adminList
  userList;
  length = 0
  loginObj;
  user ;

  authenticateUser(username, password) {
   let temp = 0
   this.getAllUsers(); 
   console.log(this.userList)
    //this.userList.forEach(function (user) {
    for(let user1 of this.userList){
      if(user1['empId'] === username && user1['password'] === password){
        sessionStorage.setItem('empId', username);
        sessionStorage.setItem('userId', user1['userId']);
        sessionStorage.setItem('fullName', user1['firstName']+" "+user1['lastName']);
        temp = 1;
      }
    }
   if(temp == 1){
    return true;
  }
    else {       
    alert("Invalid Username or Password")
    return false;
  }
  }
  getAdmin(){
    this.userService.getAllAdmin().subscribe(
      data => {
        this.adminList = data
      },
      err => {
        alert(err.message)
        console.log(err.message)
      }
    )
  }
  authenticateAdmin(username, pswd) {
    let temp = 0
    // this.getAllUsers(); 
    let loginObj = {
      empId : username,
      password : pswd
    }
    console.log("In Authentication ",loginObj)
    /*
    this.userService.adminLogin(loginObj).subscribe(
      data => {
       this.admin = data;
        console.log("user Service : autthenticate " ,this.admin);
        sessionStorage.setItem('adminName', username);
        sessionStorage.setItem('id', this.admin['userId']);
        //sessionStorage.setItem('fullName', this.admin['firstName']+" "+this.admin['lastName']);
        this.temp = 1;
      }
   );
   */
  console.log(username,pswd)
  /*
   if(username === "admin1" && pswd ==="Admin@123"){
    console.log("**********")
    //console.log("user Service : autthenticate " ,this.admin);
    sessionStorage.setItem('adminName', username);
    //sessionStorage.setItem('id', this.admin['userId']);
    sessionStorage.setItem('adminId','1');

    //sessionStorage.setItem('fullName', this.admin['firstName']+" "+this.admin['lastName']);
    temp = 1;
  }
  */
  for(let admin1 of this.adminList){
    if(admin1['name'] === username && admin1['password'] === pswd){
      sessionStorage.setItem('adminName', username);
      sessionStorage.setItem('adminId', admin1['admin_id']);
     // sessionStorage.setItem('fullName', admin1['firstName']+" "+admin1['lastName']);
      temp = 1;
    }
    console.log(admin1)
  }
  if(temp === 1){
    //alert("Success Username or Password")

     return true;
   }
     else {       
     alert("Invalid Username or Password")
     return false;
   }
   }
/*
  login(username,password){
    let temp=0
    // this.userList.forEach(function (user) {
    //   if(user['empId'] === username && user['password'] === password){
    //     sessionStorage.setItem('userName', username);
    //     sessionStorage.setItem('id', user['userId']);
    //     sessionStorage.setItem('fullName', user['firstName']+" "+user['lastName']);
    //     this.temp = 1;
    //   }
    // });
    
    this.userService.login(username, password).subscribe(
      data => {
        this.user = data;
        console.log("user Service : autthenticate " ,this.user);
        sessionStorage.setItem('userName', username);
        sessionStorage.setItem('userId', this.user['userId']);
        sessionStorage.setItem('fullName', this.user['firstName']+" "+this.user['lastName']);
        temp = 1;
      }
   );
   
  }
*/
  getAllUsers(){
    this.userService.getAllUserP().subscribe(
      data => {
        this.userList = data
      },
      err => {
        console.log(err.message)
      }
    )
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('empId')
    //console.log(!(user === null))
    return !(user === null)
  }

  isAdminLoggedIn(){
    let admin = sessionStorage.getItem('adminName')
    //if(admin.startsWith("admin"))
    return !(admin === null)

  }

  logOut() {
    sessionStorage.removeItem('empId')
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('fullName');
    sessionStorage.removeItem('adminName')
    sessionStorage.removeItem('adminId');
    // sessionStorage.removeItem('id');


  }
}
