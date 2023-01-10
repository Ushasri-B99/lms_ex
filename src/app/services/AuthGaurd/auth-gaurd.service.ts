import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate{

  constructor(private router: Router,
    private authService: AuthenticationServiceService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn())
      return true;
    else if(this.authService.isAdminLoggedIn())
    return true;
    else{
      this.router.navigate(['login']);
      return false;
    }
    

  }
}
