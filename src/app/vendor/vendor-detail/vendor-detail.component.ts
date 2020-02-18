import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'app/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StandardResponse } from 'app/Model/StandardResponse';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Vendor } from 'app/Model/vendor';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  isLoading: boolean = true;
  vendor$: Vendor = new Vendor();
  notificationTemp: NotificationsComponent
  vendorId: string = this.route.snapshot.params.id?this.route.snapshot.params.id:"";
  action: string = "";
  updateVendorResponse = new StandardResponse() ;
  constructor(private router:Router, private dataService:DataService, private route:ActivatedRoute, private notis: NotificationsComponent) {
    this.updateVendorResponse.msg = "";
  }

  ngOnInit() {
    if(this.vendorId == ""){
      this.action = "Add";
      this.vendor$ = new Vendor();
      this.isLoading = false;
    }else{
      this.dataService.getVendor(this.vendorId).subscribe(
        data => {
          this.vendor$ = data;
          this.action = "Update";
          this.isLoading = false;
        }
      );
    }
  }

  invalidForm(){
    var nameRegex = /^[A-Za-z ]+$/;
    var numRegex = /^((\+)?(\d{2}[-]))?(\d{10,15}){1}?$/;
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if(
      this.vendor$.vendorName.trim() == "" || 
      this.vendor$.vendorEmail.trim()== "" || 
      (""+this.vendor$.vendorPhone).trim()== "" || 
      !(this.vendor$.vendorPhone+"").match(numRegex) || 
      !this.vendor$.vendorEmail.match(emailRegex) ||
      !this.vendor$.vendorName.match(nameRegex) 
      ){
      return true;
    }
  }
  
  onUpdate(){
    if(this.action == "Add"){
      this.dataService.addVendor(this.vendor$).subscribe(
        data => {
          this.updateVendorResponse = data;
          if(this.updateVendorResponse.msg == 'OK'){
            this.notis.showNotification('top','right','Add Success','Vendor Added Successfully','success','check');
            this.router.navigate(['/vendor-list']);
          }
        },error =>{
          this.notis.showNotification('top','right','Add Fail','Vendor Add Failure','danger','cancel');
        }
      );
    }else{
      this.dataService.updateVendor(this.vendor$).subscribe(
        data => {
          this.updateVendorResponse = data;
          if(this.updateVendorResponse.msg == 'OK'){
            this.notis.showNotification('top','right','Update Success','Vendor Updated Successfully','success','check');
          }
        },error =>{
          this.notis.showNotification('top','right','Update Fail','Vendor Updated Failure','danger','cancel');
        }
      );
    }
  }
}
