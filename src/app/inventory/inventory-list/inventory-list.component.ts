import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { Router } from '@angular/router';
import { Inventory } from '../../Model/inventory';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  isLoading: boolean = true;
  inventories$: Inventory[];
  constructor(private dataService: DataService, private router:Router) { }

  ngOnInit() {
    return this.dataService.getInventories()
      .subscribe(data => {
        this.inventories$ = data;
        this.isLoading = false;
      });

  }

  onClick(inventoryId:string){
    this.router.navigate(['/inventory-detail',inventoryId]);
  }
}
