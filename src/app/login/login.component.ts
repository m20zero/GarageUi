import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/authentication.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { CurrentUser } from 'app/Model/currentuser';
import { AppGlobals } from 'app/global';


@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {

  username : string ="";
  password : string = "";
  invalidLogin = false;
  hideButton : boolean = false;

  constructor(private globalData:AppGlobals, private router: Router, public loginservice: AuthenticationService, private notis: NotificationsComponent) { }

  ngOnInit() {
  }

  invalidForm(){
    if(this.username.trim().length<=0 || this.password.trim().length<=0){
      return true;
    }
  }

  checkLogin() {
    this.hideButton = true;
    return (this.loginservice.authenticate(this.username, this.password).subscribe(
    data => {
      this.globalData.userName=this.username;
      this.loginservice.getUserRoles().then(()=>{
        this.notis.showNotification('top','right','Logged In','Success','success','check');
        this.router.navigate([''])
        this.invalidLogin = false;
      });
    },
    error => {
      this.notis.showNotification('top','right','Logged In Fail','Fail','danger','cancel');
      this.invalidLogin = true;
      this.hideButton = false;
    }
  ));
  }
}