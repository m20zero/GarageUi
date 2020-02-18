import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'app/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StandardResponse } from 'app/Model/StandardResponse';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Inventory } from '../../Model/inventory';
import { FormControl } from '@angular/forms';
import { Vendor } from 'app/Model/vendor';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css']
})

export class InventoryDetailComponent implements OnInit {
  isLoading: boolean = true;
  myControl = new FormControl();
  myControl1 = new FormControl();
  options:string[]=['Spare Part', 'Lubricant','Electrical'];
  vendorsData: Vendor[]=[];
  vendors: string[]=[];
  tempVendor: string;
  tempString: string;
  inventory$: Inventory = new Inventory();
  notificationTemp: NotificationsComponent
  inventoryId: string = this.route.snapshot.params.id?this.route.snapshot.params.id:"";
  action: string = "";
  updateInventoryResponse = new StandardResponse() ;
  constructor(private router:Router, private dataService:DataService, private route:ActivatedRoute, private notis: NotificationsComponent) {
    this.updateInventoryResponse.msg = "";
  }

  ngOnInit() {
    this.dataService.getVendors().subscribe(data=>{
      this.vendorsData = data;
      for(var i=0;i<this.vendorsData.length;i++){
        this.tempString = this.vendorsData[i].vendorId + " | " +  this.vendorsData[i].vendorName;
        this.vendors.push(this.tempString);
      }
      if(this.inventoryId == ""){
        this.myControl.setValue('Spare Part');
        this.action = "Add";
        this.inventory$ = new Inventory();
        this.isLoading = false;
      }else{
        this.dataService.getInventory(this.inventoryId).subscribe(
          data => {
            this.inventory$ = data;
            this.action = "Update";
            this.myControl.setValue(this.inventory$.itemType);
            for(var i=0;i<this.vendorsData.length;i++){
              if(this.inventory$.vendorId == this.vendorsData[i].vendorId ){
                this.myControl1.setValue(this.vendorsData[i].vendorId + " | " +  this.vendorsData[i].vendorName);
              }  
            }
            this.isLoading = false;
          }
        );
      }
    });
    
  }
  
  invalidForm(){
    if(
      this.inventory$.itemName.trim().length <= 0 ||
      this.inventory$.itemNumber.trim().length <= 0 ||
      this.inventory$.itemCompany.trim().length <= 0 ||
      this.inventory$.itemPuchasePrice < 0 || 
      this.inventory$.itemQty <= 0 || 
      this.inventory$.itemSellingPrice < 0 ||
      this.inventory$.itemPuchasePrice > this.inventory$.itemSellingPrice
      ){
      return true;
    }
  }

  onUpdate(){
    this.inventory$.itemType = this.myControl.value;
    this.tempVendor = this.myControl1.value.split("|")[0];
    this.inventory$.vendorId=parseInt(this.tempVendor.trim());
    if(this.action == "Add"){
      this.dataService.addInventory(this.inventory$).subscribe(
        data => {
          this.updateInventoryResponse = data;
          if(this.updateInventoryResponse.msg == 'OK'){
            this.notis.showNotification('top','right','Add Success','Inventory Added Successfully','success','check');
            this.router.navigate(['/inventory-list']);
          }
        },error =>{
          this.notis.showNotification('top','right','Add Fail','Inventory Add Failure','danger','cancel');
        }
      );
    }else{
      this.dataService.updateInventory(this.inventory$).subscribe(
        data => {
          this.updateInventoryResponse = data;
          if(this.updateInventoryResponse.msg == 'OK'){
            this.notis.showNotification('top','right','Update Success','Inventory Updated Successfully','success','check');
          }
        },error =>{
          this.notis.showNotification('top','right','Update Fail','Inventory Updated Failure','danger','cancel');
        }
      );
    }
  }
}
