import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { UserService } from '../services/User/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  userList;
  sessionUsername ;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
     public loginService: AuthenticationServiceService,
     private userService: UserService) { }
  ngOnInit(): void {
    this.sessionUsername = sessionStorage.getItem("fullName")
   
  }
  // nav.component.ts
  menuItems = ['leave applications', 'apply leave', 'employees', 'sign out'];

  // Get Username On Nav bar
  // if(loginService.isUserLoggedIn()){
  //   let nameEle = document.getElementById("username");
  //   let name = sessionStorage.getItem("username")
  //   console.log(name)

  // }

}
