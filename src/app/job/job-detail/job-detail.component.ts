import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'app/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StandardResponse } from 'app/Model/StandardResponse';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Job } from 'app/Model/job';
import {FormControl} from '@angular/forms';
import { Worker } from '../../Model/worker';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  isLoading: boolean = true;
  job$: Job = new Job();
  searchText: string="";
  myControl = new FormControl();
  myControl1 = new FormControl();
  myControl2 = new FormControl();
  tempWorker: string="";
  workers: Worker[];
  workerOptions: String[]=[];
  options: string[] = ['Petrol', 'Diesel'];
  jobStatusOptions: string[] = ['Pending','Completed'];
  notificationTemp: NotificationsComponent
  jobId: string = this.route.snapshot.params.id?this.route.snapshot.params.id:"";
  action: string = "";
  updateJobResponse = new StandardResponse() ;
  constructor(private router:Router,private dataService:DataService, private route:ActivatedRoute, private notis: NotificationsComponent) {
    this.updateJobResponse.msg = "";
  }

  ngOnInit() {
    this.loadWorkers();
    if(this.jobId == ""){
      this.action = "Add";
      this.job$ = new Job();
      this.myControl.setValue('Petrol');
      this.myControl1.setValue('Pending');
      this.isLoading = false;
    }else{
      this.dataService.getJob(this.jobId).subscribe(
        data => {
          this.job$ = data;
          this.action = "Update";
          this.myControl.setValue(this.job$.carFuelType);
          this.myControl1.setValue(this.job$.jobStatus);
          for(var i=0;i<this.workers.length;i++){
            if(this.job$.workerId == this.workers[i].workerId){
              this.myControl2.setValue(this.workers[i].workerId + " | " + this.workers[i].workerName);
            }  
          }
          this.isLoading = false;
        }
      );
    }
  }

  invalidName(){
    var nameRegex = /^[A-Za-z ]+$/;
    if( this.job$.customerName.trim().length <=0 || 
        !this.job$.customerName.match(nameRegex) 
      ){
      return true;
    }
    return false;
  }

  invalidEmail(){
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if( this.job$.customerEmail.trim().length <= 0 || 
        !this.job$.customerEmail.match(emailRegex)
      ){
      return true;
    }
    return false;
  }

  invalidPhone(){
    var numRegex = /^((\+)?(\d{2}[-]))?(\d{8,15}){1}?$/;
    if(
      (this.job$.customerPhone+"").trim().length <= 0 ||   
      !(this.job$.customerPhone+"").match(numRegex)
      ){
        return true;
    }
    return false;
  }

  invalidAddress(){
    if(this.job$.customerAddress.trim().length <= 0){
      return true;
    }
    return false;
  }

  invalidCarNo(){
    if(this.job$.carNo.trim().length <= 0){
      return true;
    }
    return false;
  }

  invalidBill(){
    var numbersOnlyRegex = /^[0-9]*$/;
    if(!(this.job$.bill+"").match(numbersOnlyRegex)){
      return true;
    }
    return false;
  }

  invalidEndDate(){
    if(this.job$.jobStartDate > this.job$.jobEndDate){
      return true;
    }
    return false;
  }

  invalidForm(){
    
    
    if(
      this.invalidName() || 
      this.invalidEmail() || 
      this.invalidPhone() ||
      this.invalidAddress() || 
      this.invalidCarNo() || 
      this.invalidBill() || 
      this.invalidEndDate()
      ){
      return true;
    }
    
  }

  async loadWorkers(){
    const workers = await this.dataService.getWorkersPromise();
    workers.forEach(element => {
      this.workerOptions.push(element.workerId + " | " + element.workerName);
    });
    this.workers = workers;
  }
  
  onUpdate(){
    this.job$.carFuelType = this.myControl.value;
    this.job$.jobStatus = this.myControl1.value;
    this.tempWorker = this.myControl2.value.split("|")[0];
    this.job$.workerId=this.tempWorker.trim();
    if(this.action == "Add"){
      this.dataService.addJob(this.job$).subscribe(
        data => {
          this.updateJobResponse = data;
          if(this.updateJobResponse.msg == 'OK'){
            this.notis.showNotification('top','right','Add Success','Job Added Successfully','success','check');
            this.router.navigate(['/job-list']);
          }
        },error =>{
          this.notis.showNotification('top','right','Add Fail','Job Add Failure','danger','cancel');
        }
      );
    }else{
      this.dataService.updateJob(this.job$).subscribe(
        data => {
          this.updateJobResponse = data;
          if(this.updateJobResponse.msg == 'OK'){
            this.notis.showNotification('top','right','Update Success','Job Updated Successfully','success','check');
          }
        },error =>{
          this.notis.showNotification('top','right','Update Fail','Job Updated Failure','danger','cancel');
        }
      );
    }
  }
}