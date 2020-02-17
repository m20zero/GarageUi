import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AppGlobals } from './global';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router,
    public authService: AuthenticationService,
    public globalData: AppGlobals) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    if (this.authService.isUserLoggedIn()){
      // console.log(this.globalData.userName);
        if(this.globalData.isAdmin){
          return true;
        }else{
          // console.log(this.globalData.isManager);
          if(this.globalData.isManager){
            // console.log("MANAGER");
            if(state.url === "/dashboard" ) return true;
          }
        }
      
      // return true;
    }
      
    this.router.navigate(['login']);
    // console.log("LOGIN");
    return false;
  }
}