import { Component, OnInit, Input } from '@angular/core';
import { Authority } from 'app/Model/authority';
import { DataService } from 'app/data.service';
import { AppGlobals } from 'app/global';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const MANAGERROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
];

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'Worker',  icon:'person', class: '' },
    { path: '/table-list', title: 'Worker List',  icon:'supervised_user_circle', class: '' },
    { path: '/jobcard-list', title: 'Job Card List',  icon:'library_books', class: '' },
    { path: '/jobcard-detail', title: 'Job Card',  icon:'library_books', class: '' },
    // { path: '/job-list', title: 'Job List',  icon:'library_books', class: '' },
    // { path: '/job-detail', title: 'Job',  icon:'assignment_turned_in', class: '' },
    { path: '/expense-list', title: 'Expense List',  icon:'money', class: '' },
    { path: '/expense-detail', title: 'Expense',  icon:'attach_money', class: '' },
    { path: '/inventory-list', title: 'Inventory List',  icon:'dynamic_feed', class: '' },
    { path: '/inventory-detail', title: 'Inventory',  icon:'build', class: '' },
    { path: '/vendor-list', title: 'Vendor List',  icon:'how_to_reg', class: '' },
    { path: '/vendor-detail', title: 'Vendor',  icon:'accessibility', class: '' },
    { path: '/sale-list', title: 'Sale List',  icon:'dashboard', class: '' },
    { path: '/sale-detail', title: 'Sale Detail',  icon:'money', class: '' },
    { path: '/bill-list', title: 'Bill List',  icon:'payment', class: '' }
    // { path: '/print', title: 'Print Invoice',  icon:'print', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  mySubscription: any;
  menuItems: any[];
  adminMenuItems: any[];
  managerMenuItems: any[];
  
  constructor(private dataService: DataService,private globalData: AppGlobals,private router:Router) { 
  }

  ngOnInit() {
    this.adminMenuItems = ROUTES.filter(menuItem => menuItem);
    this.managerMenuItems = MANAGERROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}


