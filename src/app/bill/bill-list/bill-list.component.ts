import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { Router } from '@angular/router';
import { Bill } from 'app/Model/bill';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  isLoading: boolean = true;
  bills$: Bill[];
  constructor(private dataService: DataService, private router:Router) { }

  ngOnInit() {
    return this.dataService.getBills()
      .subscribe(data => {
        this.bills$ = data;
        this.isLoading = false;
      });

  }

  onClick(saleId:string){
    this.router.navigate(['/bill-detail',saleId]);
  }
}
