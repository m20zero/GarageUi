import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { Router } from '@angular/router';
import { Expense } from 'app/Model/expense';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  isLoading: boolean = true;
  expenses$: Expense[];
  constructor(private dataService: DataService, private router:Router) { }

  ngOnInit() {
    return this.dataService.getExpenses()
      .subscribe(data => {
        this.expenses$ = data;
        this.isLoading = false;
      });

  }

  onClick(expenseId:string){
    this.router.navigate(['/expense-detail',expenseId]);
  }
}
