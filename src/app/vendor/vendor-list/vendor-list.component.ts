import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { Router } from '@angular/router';
import { Vendor } from '../../Model/vendor';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  isLoading: boolean = true;
  vendors$: Vendor[];
  constructor(private dataService: DataService, private router:Router) { }

  ngOnInit() {
    this.dataService.getVendors()
      .subscribe(data => {
        this.vendors$ = data;
        this.isLoading = false;
      });
  }

  onClick(vendorId:string){
    this.router.navigate(['/vendor-detail',vendorId]);
  }
}
