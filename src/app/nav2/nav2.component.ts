import { AfterContentInit, Component, OnChanges, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationServiceService } from '../services/authentication-service.service';

@Component({
  selector: 'app-nav2',
  templateUrl: './nav2.component.html',
  styleUrls: ['./nav2.component.css']
})
export class Nav2Component implements OnInit{
  sessionUsername;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    ngOnInit(): void {
      this.sessionUsername = sessionStorage.getItem("fullName")
     
    }
    
  constructor(private breakpointObserver: BreakpointObserver,public loginService : AuthenticationServiceService) {}
  menuItems = ['leaveApplications', 'applyLeave', 'employees', 'sign out'];

}
