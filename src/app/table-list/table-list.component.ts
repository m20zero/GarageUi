import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { Router } from '@angular/router';
import { Worker } from '../Model/worker';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  workers$: Worker[];
  isLoading: boolean = true;
  constructor(private dataService: DataService, private router:Router) { }

  ngOnInit() {
    return this.dataService.getWorkers()
      .subscribe(
        data => {
          this.workers$ = data;
          this.isLoading = false;
        }
      );
      
  }

  onClick(workerId:string){
    this.router.navigate(['/user-profile',workerId]);
  }
}
