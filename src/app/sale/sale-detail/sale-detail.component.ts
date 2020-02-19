import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'app/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sale } from '../../Model/sale';
import { StandardResponse } from 'app/Model/StandardResponse';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Job } from 'app/Model/job';
import { FormControl } from '@angular/forms';
import { SaleData } from 'app/Model/saledata';
import { Inventory } from 'app/Model/inventory'; 

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css']
})

export class SaleDetailComponent implements OnInit {


  isPrinting: boolean = false;
  tempInventoryList : Inventory[] = [];
  oldQty:number[]=[];
  tempInventory : Inventory = new Inventory();
  updateInventoryResponse = new StandardResponse();
  isLoading: boolean = true;
  jobId: number = 0;
  jobTotal: number = 0;
  salesTotal: number = 0;
  tempInv: Inventory=new Inventory();;
  divCount:number = 0;
  someString: string;
  currentSaleData: SaleData[]=[];
  currentSales: SaleData = new SaleData();
  myControl = new FormControl();
  myControl1 = new FormControl();
  jobOptions: string[]=[];
  itemOptions: string[]=[];
  currentJob: Job = new Job();
  jobs: Job[] = [];
  inventory: Inventory[] = [];
  sale$: Sale = new Sale();
  tempString: string="";
  notificationTemp: NotificationsComponent
  saleId: string = this.route.snapshot.params.id?this.route.snapshot.params.id:"";
  action: string = "";
  updateSaleResponse = new StandardResponse() ;
  constructor(private dataService:DataService, private route:ActivatedRoute, private notis: NotificationsComponent,private router:Router) {
    this.updateSaleResponse.msg = "";
  }

  ngOnInit() {
    this.oldQty=[];
    this.dataService.getInventories().subscribe(
      data=>{
        this.inventory = data;
        this.inventory.forEach(element => {
          this.tempString = element.id +" | "+ element.itemName + " | Avl. Qty = " + element.itemQty + " | Price = " + element.itemSellingPrice;
          this.itemOptions.push(this.tempString);
        });
      }
    );

    this.dataService.getJobs().subscribe(
      data => {
        this.jobs = data;
        this.jobs.forEach(element => {
          this.tempString = element.jobId + " | " + element.jobDescription + " | " + element.jobStartDate + " | " + element.bill;
          this.jobOptions.push(this.tempString);
        });
        if(this.saleId == ""){
          this.action = "Add";
          this.sale$ = new Sale();
          this.currentSaleData.push(this.currentSales);
          this.isLoading = false;
        }else{
          this.dataService.getSale(this.saleId).subscribe(
            data => {
              this.sale$ = data;
              this.currentSaleData = this.sale$.saleData;
              this.action = "Update";
              this.jobs.forEach(element => {
                if(this.sale$.jobId == element.jobId){
                  this.currentJob = element;
                  if(this.sale$.billed){
                    this.myControl = new FormControl({value: element.jobId + " | " + element.jobDescription + " | " + element.jobStartDate + " | " + element.bill, disabled: true});
                  }else{
                    this.myControl = new FormControl({value: element.jobId + " | " + element.jobDescription + " | " + element.jobStartDate + " | " + element.bill, disabled: false});
                  }
                  this.jobTotal = element.bill;
                }
              });

              loadSalesData(this.oldQty,this.currentSaleData,this.dataService).then(()=>{
                this.isLoading = false;
              })
            }
          );
        }
      }
    );
  }

  invalidDiscount(){
    var numbersOnlyRegex = /^[0-9]*$/;
    if(
        this.sale$.discount < 0 ||
        !(this.sale$.discount+"").match(numbersOnlyRegex) ||
        (this.sale$.discount+"").trim()==""
      ){
      return true;
    }
    return false;
  }

  invalidTotal(){
    var numbersOnlyRegex = /^[0-9]*$/;
    if(
        this.sale$.saleTotal < 0 ||
        !(this.sale$.saleTotal+"").match(numbersOnlyRegex) ||
        (this.sale$.saleTotal+"").trim()==""
      ){
      return true;
    }
    return false;
  }

  invalidCustomerName(){
    var nameRegex = /^[A-Za-z ]+$/;
    if(this.sale$.customerName.trim().length <= 0 || 
    !this.sale$.customerName.match(nameRegex)){
      return true;
    }
    return false;
  }
  invalidCustomerPhone(){
    var numRegex = /^((\+)?(\d{2}[-]))?(\d{8,15}){1}?$/;
    if(!(this.sale$.customerPhone+"").match(numRegex) || (this.sale$.customerPhone+"").trim()==""){
      return true;
    }
    return false;
  }
  invalidCustomerEmail(){
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!this.sale$.customerEmail.match(emailRegex) ){
      return true;
    }
    return false;
  }

  invalidQty(){
    for(var i=0;i<this.currentSaleData.length;i++){
      var tempQty = this.currentSaleData[i].someString.split("|")[2].split("=")[1].trim();
      if(this.currentSaleData[i].qty <= 0 || this.currentSaleData[i].qty > parseInt(tempQty)){
        return true;
      }
    }
  }

  invalidForm(){   
    if(
      this.invalidDiscount() ||
      this.invalidTotal() ||
      this.invalidCustomerName() ||
      this.invalidCustomerPhone() ||
      this.invalidCustomerEmail() ||
      this.invalidQty()
      )
      {
      return true;
    }    
  }

  print(saleId:string){
    this.isPrinting = true;
    this.sale$.billed = true;
    this.onUpdate();
    this.router.navigate(['/print',saleId]);
  }

  bill(saleId:string){
    this.sale$.billed = true;
    this.router.navigate(['/bill-detail',saleId]);
  }

  onJobChange(data:string){
    this.sale$.saleTotal -= this.jobTotal*1;
    this.jobTotal = this.myControl.value.split('|')[3].trim();
    this.sale$.saleTotal += this.jobTotal*1;
  }

  onItemChange(data:string){
    this.onQtyChange();
  }

  getOldQty(index:number){
    this.oldQty[index] = this.currentSaleData[index].qty;
  }

  onQtyChange(){
    for(var i=0;i<this.currentSaleData.length;i++){
      if(this.currentSaleData[i].qty == undefined){
        this.currentSaleData[i].qty = 1;
      }
      this.currentSaleData[i].inventoryId = parseInt(this.currentSaleData[i].someString.split("|")[0].trim());
      this.currentSaleData[i].total = parseInt(this.currentSaleData[i].someString.split("|")[3].trim().split(" ")[2]) * this.currentSaleData[i].qty;
      this.salesTotal += this.currentSaleData[i].total;
    }
    this.sale$.saleTotal = (this.jobTotal*1 + this.salesTotal*1) - this.sale$.discount*1;
    this.salesTotal=0;
  }

  onAddDiv(){
    this.currentSales = new SaleData();
    this.currentSaleData.push(this.currentSales);
  }

  onRemoveDiv(index){
    this.currentSaleData.splice(index);
  }

  async loadSalesDataInv(){
    this.tempInventoryList=[];
    for(var i = 0; i < this.currentSaleData.length; i++){
      var tempInv = new Inventory();

      const tempInv1 = await this.dataService.getInventoryPromise(this.currentSaleData[i].inventoryId+"");
      tempInv = tempInv1;
      this.tempInventoryList.push(tempInv);
    }
  }

  onUpdate(){
    // this.onQtyChange();
    this.loadSalesDataInv().then(()=>{
      for(var i=0;i<this.currentSaleData.length;i++){
        
        if(this.oldQty[i]==undefined){
          this.tempInventoryList[i].itemQty = this.tempInventoryList[i].itemQty*1 - this.currentSaleData[i].qty*1;
        }else{
          this.tempInventoryList[i].itemQty = this.tempInventoryList[i].itemQty*1 + this.oldQty[i]*1 - this.currentSaleData[i].qty*1;
        }
        console.log(this.tempInventoryList[i].itemQty);
        this.dataService.updateInventory(this.tempInventoryList[i]).subscribe(data=>{
          this.updateInventoryResponse = data;
          if(this.updateInventoryResponse.msg == "OK"){
            console.log("DONE");
          }
        },error=>{
          console.log("ERROR");
        })
        this.currentSaleData[i].inventoryId = parseInt(this.currentSaleData[i].someString.split("|")[0].trim());
        this.currentSaleData[i].total = parseInt(this.currentSaleData[i].someString.split("|")[3].trim().split(" ")[2]) * this.currentSaleData[i].qty;
        this.salesTotal += this.currentSaleData[i].total;
      }

      this.sale$.saleData = this.currentSaleData; 
      this.sale$.jobId = this.myControl.value.split('|')[0].trim();
      this.jobTotal = this.myControl.value.split('|')[3].trim();
  
      this.sale$.saleTotal = (this.jobTotal*1 + this.salesTotal*1) - this.sale$.discount*1;
      this.salesTotal=0;
     
      if(this.action == "Add"){
        this.dataService.addSale(this.sale$).subscribe(
          data => {
            this.updateSaleResponse = data;
            if(this.updateSaleResponse.msg == 'OK'){
              this.notis.showNotification('top','right','Add Success','Sale Added Successfully','success','check');
              if(!this.isPrinting){
                this.router.navigate(['/sale-list']);  
              }
            }
          },error => {
            this.notis.showNotification('top','right','Add Fail','Sale Add Failure','danger','cancel');
          }
        );
      }else{
        this.dataService.updateSale(this.sale$).subscribe(
          data => {
            this.updateSaleResponse = data;
            if(this.updateSaleResponse.msg == 'OK'){
              this.notis.showNotification('top','right','Update Success','Sale Updated Successfully','success','check');
              if(!this.isPrinting){
                this.router.navigate(['/sale-list']);  
              }
            }
          },error =>{
            this.notis.showNotification('top','right','Update Fail','Sale Updated Failure','danger','cancel');
          }
        );
      }
    })
  }
}


async function loadSalesData(oldQty:number[],currentSaleData: SaleData[],dataService:DataService){
  for(var i = 0; i < currentSaleData.length; i++){
    var tempS: string = "";
    var tempInv = new Inventory();
    await new Promise(resolve => {
      setTimeout(()=>{
        dataService.getInventory(currentSaleData[i].inventoryId+"").subscribe(
          data=>{
            tempInv = data;
            tempS=tempInv.id + " | " + tempInv.itemName + " | Avl. Qty = " + tempInv.itemQty + " | Price = " + tempInv.itemSellingPrice;
            currentSaleData[i-1].someString = tempS;
            oldQty[i-1]=currentSaleData[i-1].qty;
          }
        )
        resolve();
      },500)
    }
    )
  }
}
