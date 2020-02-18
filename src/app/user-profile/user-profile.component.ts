import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'app/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Worker } from '../Model/worker';
import { StandardResponse } from 'app/Model/StandardResponse';
import { NotificationsComponent } from 'app/notifications/notifications.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

  isLoading: boolean = true;
  worker$: Worker = new Worker();
  notificationTemp: NotificationsComponent
  workerId: string = this.route.snapshot.params.id?this.route.snapshot.params.id:"";
  action: string = "";
  updateWorkerResponse = new StandardResponse() ;
  constructor(private router:Router,private dataService:DataService, private route:ActivatedRoute, private notis: NotificationsComponent) {
    this.updateWorkerResponse.msg = "";
  }

  ngOnInit() {
    if(this.workerId == ""){
      this.action = "Add";
      this.worker$ = new Worker();
      this.isLoading = false;
    }else{
      this.dataService.getWorker(this.workerId).subscribe(
        data => {
          this.worker$ = data;
          this.action = "Update";
          this.isLoading = false;
        }
      );
    }
  }

  invalidName(){
    var nameRegex = /^[A-Za-z ]+$/;
    if( this.worker$.workerName.trim() == "" || 
        !this.worker$.workerName.match(nameRegex)
      ){
      return true;
    }
    return false;
  }

  invalidEmail(){
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if( this.worker$.workerEmail.trim() == "" || 
        !this.worker$.workerEmail.match(emailRegex)
      ){
      return true;
    }
    return false;
  }

  invalidSalary(){
    if(this.worker$.workerSalary <= 0){
      return true;
    }
    return false;
  }

  invalidPhone(){
    var numRegex = /^((\+)?(\d{2}[-]))?(\d{8,15}){1}?$/;
    if(
        (""+this.worker$.workerPhone).trim()== "" ||   
        !(this.worker$.workerPhone+"").match(numRegex)
      ){
        return true;
    }
    return false;
  }

  invalidForm(){
    if(
      this.invalidName() || 
      this.invalidEmail() || 
      this.invalidSalary() || 
      this.invalidPhone()
      ){
      return true;
    }
  }
  
  onUpdate(){
    if(this.action == "Add"){
      this.dataService.addWorker(this.worker$).subscribe(
        data => {
          this.updateWorkerResponse = data;
          if(this.updateWorkerResponse.msg == 'OK'){
            this.notis.showNotification('top','right','Add Success','Worker Added Successfully','success','check');
            this.router.navigate(['/table-list']); 
          }
        },error =>{
          this.notis.showNotification('top','right','Add Fail','Worker Add Failure','danger','cancel');
          this.router.navigate(['/table-list']); 
        }
      );
    }else{
      this.dataService.updateWorker(this.worker$).subscribe(
        data => {
          this.updateWorkerResponse = data;
          if(this.updateWorkerResponse.msg == 'OK'){
            this.notis.showNotification('top','right','Update Success','Worker Updated Successfully','success','check');
          }
        },error =>{
          this.notis.showNotification('top','right','Update Fail','Worker Updated Failure','danger','cancel');
        }
      );
    }
  }
}
