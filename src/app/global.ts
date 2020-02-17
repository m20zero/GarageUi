import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AppGlobals {
    public userName:string="";
    public token:string="";
    public isAdmin:boolean=false;
    public isManager:boolean=false;
    
    // constructor(private authenticationService: AuthenticationService){
    //     this.authenticationService.getUserRoles();
    // }
}