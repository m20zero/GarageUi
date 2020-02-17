import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DataService } from './data.service';
import { Authority } from './Model/authority';
import { AppGlobals } from './global';

export class User{
  constructor(public status:string) {}
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  auths: Authority[]=[];
  
  constructor(
    private httpClient:HttpClient, private dataService: DataService, 
    public globalData:AppGlobals ) { 
  }
  
  authenticate(username, password) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get<User>(
      this.dataService.apiUrl+'validateLogin',{headers}
      ).pipe(
      map(
       userData => {
        sessionStorage.setItem('username',username);
        let authString = 'Basic ' + btoa(username + ':' + password);
        sessionStorage.setItem('basicauth', authString); 
        this.globalData.userName = username;
        this.globalData.token = authString;
        return userData;
       }
     )
    );

  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('basicauth') 
    this.globalData.userName="";
    this.globalData.token="";
    this.globalData.isAdmin=false;
    this.globalData.isManager=false;
  }
  
  async getUserRoles(){
    this.auths = await this.dataService.getUserRoles();
    this.auths.forEach(element => {
      if(element.authority.includes("ROLE_ADMIN")){
        
        this.globalData.isAdmin = true;
        this.globalData.isManager = false;
      }
      if(element.authority.includes("ROLE_USER")){
        this.globalData.isAdmin = false;
        this.globalData.isManager = true;
        
      }
    });
  }
}