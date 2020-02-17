import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Worker } from './Model/worker';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { StandardResponse } from './Model/StandardResponse';
import { Job } from './Model/job';
import { Expense } from './Model/expense';
import { Inventory } from './Model/inventory';
import { Vendor } from './Model/vendor';
import { Sale } from './Model/sale';
import { Authority } from './Model/authority';
import { AppGlobals } from './global';
import { Bill } from './Model/bill';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:8080/';
  user = sessionStorage.getItem('username');

  constructor(private _http:HttpClient,public globalData:AppGlobals) { }

  //USER ROLES

  getUserRoles(){
    return this._http.get<Authority[]>(this.apiUrl+`api/userroles/${this.globalData.userName}`).toPromise();
  }

  //WORKER
  getWorkers(){
    return this._http.get<Worker[]>(this.apiUrl+'api/workers');
  }

  getWorkersPromise(){
    return this._http.get<Worker[]>(this.apiUrl+'api/workers').toPromise();
  }

  getWorker(workerId: string){
    return this._http.get<Worker>(this.apiUrl + `api/worker/${workerId}`);
  }

  updateWorker(worker: Worker):Observable<StandardResponse>{ 
    return this._http.put<StandardResponse>(this.apiUrl + `api/worker/`,worker);
  }

  addWorker(worker: Worker):Observable<StandardResponse>{
    return this._http.post<StandardResponse>(this.apiUrl + `api/worker/`,worker);
  }

  //JOB

  getJobs(){
    return this._http.get<Job[]>(this.apiUrl+'api/jobs');
  }

  getCompletedJobs(){
  
    return this._http.get<Job[]>(this.apiUrl+'api/jobs/Completed');
  }

  getPendingJobs(){
  
    return this._http.get<Job[]>(this.apiUrl+'api/jobs/Pending');
  }

  getJob(jobId: string){
  
    return this._http.get<Job>(this.apiUrl + `api/job/${jobId}`);
  }

  getJobPromise(jobId: string){
  
    return this._http.get<Job>(this.apiUrl + `api/job/${jobId}`).toPromise();
  }

  updateJob(job: Job):Observable<StandardResponse>{ 
  
    return this._http.put<StandardResponse>(this.apiUrl + `api/jobs/`,job);
  }

  addJob(job: Job):Observable<StandardResponse>{
  
    return this._http.post<StandardResponse>(this.apiUrl + `api/jobs/`,job);
  }

  //EXPENSE

  getExpenses(){
  
    return this._http.get<Expense[]>(this.apiUrl+'api/expenses');
  }

  getExpense(expenseId: string){
  
    return this._http.get<Expense>(this.apiUrl + `api/expense/${expenseId}`);
  }

  updateExpense(expense: Expense):Observable<StandardResponse>{ 
  
    return this._http.put<StandardResponse>(this.apiUrl + `api/expense/`,expense);
  }

  addExpense(expense: Expense):Observable<StandardResponse>{
  
    return this._http.post<StandardResponse>(this.apiUrl + `api/expense/`,expense);
  }

  //DASHBOARD STAT REPORT

  getCompletedJobsCount():Observable<number>{
  
    return this._http.get<number>(this.apiUrl + `api/statreport/job/Completed`);
  }

  getPendingJobsCount():Observable<number>{
  
    return this._http.get<number>(this.apiUrl + `api/statreport/job/Pending`);
  }

  //INVENTORY
  getInventories(){
 
    return this._http.get<Inventory[]>(this.apiUrl+'api/inventory');
  }
  
  getInventory(inventoryId: string){
  
    return this._http.get<Inventory>(this.apiUrl + `api/inventory/${inventoryId}`);
  }

  getInventoryPromise(inventoryId: string){
  
    return this._http.get<Inventory>(this.apiUrl + `api/inventory/${inventoryId}`).toPromise();
  }

  updateInventory(inventory: Inventory):Observable<StandardResponse>{ 
  
    return this._http.put<StandardResponse>(this.apiUrl + `api/inventory/`,inventory);
  }

  addInventory(inventory: Inventory):Observable<StandardResponse>{
  
    return this._http.post<StandardResponse>(this.apiUrl + `api/inventory/`,inventory);
  }

  //VENDOR
  getVendors(){
  
    return this._http.get<Vendor[]>(this.apiUrl+'api/vendors');
  }

  getVendor(inventoryId: string){
  
    return this._http.get<Vendor>(this.apiUrl + `api/vendor/${inventoryId}`);
  }

  updateVendor(vendor: Vendor):Observable<StandardResponse>{
   
    return this._http.put<StandardResponse>(this.apiUrl + `api/vendors/`,vendor);
  }

  addVendor(vendor: Vendor):Observable<StandardResponse>{
  
    return this._http.post<StandardResponse>(this.apiUrl + `api/vendors/`,vendor);
  }

  //SALE

  getSales(){
  
    return this._http.get<Sale[]>(this.apiUrl+'api/sales');
  }

  getSale(saleId: string){
  
    return this._http.get<Sale>(this.apiUrl + `api/sale/${saleId}`);
  }

  getSalePromise(saleId: string){
  
    return this._http.get<Sale>(this.apiUrl + `api/sale/${saleId}`).toPromise();
  }

  updateSale(sale: Sale):Observable<StandardResponse>{ 
  
    return this._http.put<StandardResponse>(this.apiUrl + `api/sales/`,sale);
  }

  addSale(sale: Sale):Observable<StandardResponse>{
  
    return this._http.post<StandardResponse>(this.apiUrl + `api/sales/`,sale);
  }

  //BILL

  getBills(){
    return this._http.get<Bill[]>(this.apiUrl+'api/bills');
  }

  getBillBySaleId(saleId: string){
    return this._http.get<Bill>(this.apiUrl+`api/billbysale/${saleId}`).toPromise();
  }

  getBill(billId: string){
    return this._http.get<Bill>(this.apiUrl + `api/bill/${billId}`);
  }

  addBill(bill: Bill):Observable<StandardResponse>{
    return this._http.post<StandardResponse>(this.apiUrl + `api/bills/`,bill);
  }
}