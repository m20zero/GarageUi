import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'app/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StandardResponse } from 'app/Model/StandardResponse';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import {FormControl} from '@angular/forms';
import { Worker } from '../../Model/worker';
import { JobCard } from 'app/Model/jobcard';
import { Task } from 'app/Model/task';

@Component({
  selector: 'app-jobcard-detail',
  templateUrl: './jobcard-detail.component.html',
  styleUrls: ['./jobcard-detail.component.css']
})
export class JobCardDetailComponent implements OnInit {

  isLoading: boolean = true;
  jobCard$: JobCard = new JobCard();
  currentTasksList: Task[] = [];
  currentTask: Task = new Task();
  myControl = new FormControl();
  myControl1 = new FormControl();
  myControl2 = new FormControl();
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
      this.jobCard$ = new JobCard();
      this.myControl.setValue('Petrol');
      this.myControl1.setValue('Pending');
      this.isLoading = false;
    }else{
      this.dataService.getJobCard(this.jobId).subscribe(
        data => {
          this.jobCard$ = data;
          this.currentTasksList = this.jobCard$.task;
          console.log(this.currentTasksList);
          this.action = "Update";
          this.myControl.setValue(this.jobCard$.carFuelType);
          this.myControl1.setValue(this.jobCard$.status);
          this.isLoading = false;
          for(var i=0;i<this.currentTasksList.length;i++){
            for(var j=0;j<this.workers.length;j++){
              if(this.currentTasksList[i].workerId+"" == this.workers[j].workerId){
                this.currentTasksList[i].someString=this.workers[j].workerId + " | " + this.workers[j].workerName;
              }  
            }
          }
        }
      );
      this.isLoading=false;
    }
  }

  invalidName(){
    var nameRegex = /^[A-Za-z ]+$/;
    if( this.jobCard$.customerName.trim().length <=0 || 
        !this.jobCard$.customerName.match(nameRegex) 
      ){
      return true;
    }
    return false;
  }

  invalidEmail(){
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if( this.jobCard$.customerEmail.trim().length <= 0 || 
        !this.jobCard$.customerEmail.match(emailRegex)
      ){
      return true;
    }
    return false;
  }

  invalidPhone(){
    var numRegex = /^((\+)?(\d{2}[-]))?(\d{8,15}){1}?$/;
    if(
      (this.jobCard$.customerPhone+"").trim().length <= 0 ||   
      !(this.jobCard$.customerPhone+"").match(numRegex)
      ){
        return true;
    }
    return false;
  }

  invalidAddress(){
    if(this.jobCard$.customerAddress.trim().length <= 0){
      return true;
    }
    return false;
  }

  invalidCarNo(){
    if(this.jobCard$.carNo.trim().length <= 0){
      return true;
    }
    return false;
  }

  invalidBill(){
    var numbersOnlyRegex = /^[0-9]*$/;
    if(!(this.jobCard$.total+"").match(numbersOnlyRegex)){
      return true;
    }
    return false;
  }

  invalidEndDate(){
    if(this.jobCard$.jobStartDate > this.jobCard$.jobEndDate){
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

  onAddDiv(){
    this.currentTask = new Task();
    this.currentTasksList.push(this.currentTask);
  }

  onRemoveDiv(index){
    this.currentTasksList.splice(index);
  }

  async loadWorkers(){
    const workers = await this.dataService.getWorkersPromise();
    workers.forEach(element => {
      this.workerOptions.push(element.workerId + " | " + element.workerName);
    });
    this.workers = workers;
  }
  
  onTaskPrice(){
    this.jobCard$.total=0;
    for(var i=0;i<this.currentTasksList.length;i++){
      this.jobCard$.total += this.currentTasksList[i].taskTotal;
    }
  }

  onUpdate(){
    this.jobCard$.carFuelType = this.myControl.value;
    this.jobCard$.status = this.myControl1.value;
    for(var i=0;i<this.currentTasksList.length;i++){
      this.currentTasksList[i].workerId = parseInt(this.currentTasksList[i].someString.split("|")[0].trim());
    }
    this.jobCard$.task = this.currentTasksList;
    if(this.action == "Add"){
      this.dataService.addJobCard(this.jobCard$).subscribe(
        data => {
          this.updateJobResponse = data;
          if(this.updateJobResponse.msg == 'OK'){
            this.notis.showNotification('top','right','Add Success','JobCard Added Successfully','success','check');
            this.router.navigate(['/jobcard-list']);
          }
        },error =>{
          this.notis.showNotification('top','right','Add Fail','JobCard Add Failure','danger','cancel');
        }
      );
    }else{
      this.dataService.updateJobCard(this.jobCard$).subscribe(
        data => {
          this.updateJobResponse = data;
          if(this.updateJobResponse.msg == 'OK'){
            this.notis.showNotification('top','right','Update Success','JobCard Updated Successfully','success','check');
          }
        },error =>{
          this.notis.showNotification('top','right','Update Fail','JobCard Updated Failure','danger','cancel');
        }
      );
    }
  }
}