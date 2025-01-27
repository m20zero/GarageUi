import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Sale } from 'app/Model/sale';
import { DataService } from 'app/data.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { SaleData } from 'app/Model/saledata';
import { Inventory } from 'app/Model/inventory';
import { Bill } from 'app/Model/bill';
import { StandardResponse } from 'app/Model/StandardResponse';
import { BillLine } from 'app/Model/billline';
import { JobCard } from 'app/Model/jobcard';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.css']
})

export class PrintComponent implements OnInit{
  isLoading: boolean = true;
  bill: Bill = new Bill();
  currentBill: Bill = new Bill();
  billLine: BillLine = new BillLine();
  billLineList: BillLine[]=[];
  addBillResponse: StandardResponse;
  sale$: Sale = new Sale();
  jobCard: JobCard = new JobCard();
  saleData: SaleData[]=[];
  inventory: Inventory = new Inventory();
  inventoryList: Inventory[]=[];
  saleId: string = this.route.snapshot.params.id?this.route.snapshot.params.id:"";
  constructor(private dataService:DataService, private route:ActivatedRoute, private notis: NotificationsComponent) {
  }

  ngOnInit(){
    this.getAllData().then(()=>{
      this.bill.billDate = new Date();
      this.bill.billTotal = this.sale$.saleTotal;
      this.bill.customerEmail = this.sale$.customerEmail;
      this.bill.customerName = this.sale$.customerName;
      this.bill.customerPhone = this.sale$.customerPhone;
      this.bill.discount = this.sale$.discount;
      this.bill.jobDescription = this.jobCard.description;
      this.bill.jobId = this.jobCard.jobId;
      this.bill.jobTotal = this.jobCard.total;
      this.bill.jobStartDate = this.jobCard.jobStartDate;
      this.bill.jobEndDate = this.jobCard.jobEndDate;
      this.bill.carNo = this.jobCard.carNo;
      this.bill.carBrand = this.jobCard.carBrand;
      this.bill.carModel = this.jobCard.carModel;
      this.bill.saleId = this.sale$.saleId;
      this.bill.billLine = this.billLineList;
      this.addBill();
    })
  }
  
  async loadBill(){
    this.currentBill = await this.dataService.getBillBySaleId(this.sale$.saleId+"");
  }

  addBill(){
    this.dataService.addBill(this.bill).subscribe(
      data => {
        this.addBillResponse = data;
        if(this.addBillResponse.msg == 'OK'){
          this.notis.showNotification('top','right','Add Success','Bill Added Successfully','success','check');
          this.loadBill().then(()=>{
            this.isLoading = false;
          });
          
        }
      },error =>{
        this.notis.showNotification('top','right','Add Fail','Bill Add Failure','danger','cancel');
      }
    )
  }

  async getAllData(){
    this.sale$ = await this.dataService.getSalePromise(this.saleId);
    this.jobCard = await this.dataService.getJobCardPromise(this.sale$.jobId+"");
    this.saleData = this.sale$.saleData;
    for(var i=0;i<this.saleData.length;i++){
      this.inventory = new Inventory();
      this.inventory = await this.dataService.getInventoryPromise(this.saleData[i].inventoryId+"");
      this.inventoryList.push(this.inventory);
      this.billLine = new BillLine();
      this.billLine.inventoryId = this.inventory.id;
      this.billLine.inventoryName = this.inventory.itemName;
      this.billLine.itemCompany  = this.inventory.itemCompany;
      this.billLine.itemNumber = this.inventory.itemNumber;
      this.billLine.itemSellingPrice = this.inventory.itemSellingPrice;
      this.billLine.qty = this.saleData[i].qty;
      this.billLineList.push(this.billLine);
    }
  }
}