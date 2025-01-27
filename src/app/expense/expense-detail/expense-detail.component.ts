import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'app/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Worker } from '../../Model/worker';
import { StandardResponse } from 'app/Model/StandardResponse';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Job } from 'app/Model/job';
import { Expense } from 'app/Model/expense';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit {

  isLoading: boolean = true;
  expense$: Expense = new Expense();
  myControl = new FormControl();
  options: string[] = ['Daily', 'Fix'];
  notificationTemp: NotificationsComponent
  expenseId: string = this.route.snapshot.params.id?this.route.snapshot.params.id:"";
  action: string = "";
  updateExpenseResponse = new StandardResponse() ;
  constructor(private router:Router,private dataService:DataService, private route:ActivatedRoute, private notis: NotificationsComponent) {
    this.updateExpenseResponse.msg = "";
  }

  ngOnInit() {
    if(this.expenseId == ""){
      this.action = "Add";
      this.expense$ = new Expense();
      this.myControl.setValue('Daily');
      this.isLoading = false;
    }else{
      this.dataService.getExpense(this.expenseId).subscribe(
        data => {
          this.expense$ = data;
          this.myControl.setValue(this.expense$.expenseType);
          this.action = "Update";
          this.isLoading = false;
        }
      );
      
    }
  }

  invalidTitle(){
    if( this.expense$.expenseTitle.trim().length <= 0){
        return true;
    }
    return false;
  }

  invalidAmount(){
    if( this.expense$.expenseAmount <= 0){
        return true;
    }
    return false;
  }

  invalidForm(){
    if(
      this.invalidTitle() ||
      this.invalidAmount()
      ){
      return true;
    }
  }
  
  onUpdate(){
    this.expense$.expenseType = this.myControl.value;
    if(this.action == "Add"){
      this.dataService.addExpense(this.expense$).subscribe(
        data => {
          this.updateExpenseResponse = data;
          if(this.updateExpenseResponse.msg == 'OK'){
            this.notis.showNotification('top','right','Add Success','Expense Added Successfully','success','check');
            this.router.navigate(['/expense-list']);
          }
        },error =>{
          this.notis.showNotification('top','right','Add Fail','Expense Add Failure','danger','cancel');
        }
      );
    }else{
      this.dataService.updateExpense(this.expense$).subscribe(
        data => {
          this.updateExpenseResponse = data;
          if(this.updateExpenseResponse.msg == 'OK'){
            this.notis.showNotification('top','right','Update Success','Expense Updated Successfully','success','check');
          }
        },error =>{
          this.notis.showNotification('top','right','Update Fail','Expense Updated Failure','danger','cancel');
        }
      );
    }
  }
}
