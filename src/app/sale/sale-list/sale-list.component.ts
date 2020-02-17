import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { Router } from '@angular/router';
import { Sale } from '../../Model/sale';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {

  isLoading: boolean = true;
  sales$: Sale[];
  constructor(private dataService: DataService, private router:Router) { }

  ngOnInit() {

    return this.dataService.getSales()
      .subscribe(data => {
        this.sales$ = data;
        this.isLoading = false;
      }
      );

  }

  onClick(saleId:string){
    this.router.navigate(['/sale-detail',saleId]);
  }
}
