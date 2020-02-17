import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'app/data.service';
import { ActivatedRoute } from '@angular/router';
import { StandardResponse } from 'app/Model/StandardResponse';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Bill } from 'app/Model/bill';
import { BillLine } from 'app/Model/billline';
import { Sale } from 'app/Model/sale';
import { Job } from 'app/Model/job';
import { SaleData } from 'app/Model/saledata';
import { Inventory } from 'app/Model/inventory';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.css']
})
export class BillDetailComponent implements OnInit {

  isLoading: boolean = true;
  
  currentBill: Bill = new Bill();
  billLine: BillLine = new BillLine();
  billLineList: BillLine[]=[];
  addBillResponse: StandardResponse;
  sale$: Sale = new Sale();
  job: Job = new Job();
  saleData: SaleData[]=[];
  inventory: Inventory = new Inventory();
  inventoryList: Inventory[]=[];
  saleId: string = this.route.snapshot.params.id?this.route.snapshot.params.id:"";
  constructor(private dataService:DataService, private route:ActivatedRoute, private notis: NotificationsComponent) {
  }

  ngOnInit(){
    this.loadBill().then(()=>{
      this.isLoading = false;
    })
    
  }
  
  async loadBill(){
    this.currentBill = await this.dataService.getBillBySaleId(this.saleId+"");
  }
}
  
