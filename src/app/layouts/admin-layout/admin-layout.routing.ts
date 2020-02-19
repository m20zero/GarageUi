import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { JobListComponent } from 'app/job/job-list/job-list.component';
import { JobDetailComponent } from 'app/job/job-detail/job-detail.component';
import { ExpenseDetailComponent } from 'app/expense/expense-detail/expense-detail.component';
import { ExpenseListComponent } from 'app/expense/expense-list/expense-list.component';
import { InventoryDetailComponent } from 'app/inventory/inventory-detail/inventory-detail.component';
import { InventoryListComponent } from 'app/inventory/inventory-list/inventory-list.component';
import { VendorListComponent } from 'app/vendor/vendor-list/vendor-list.component';
import { VendorDetailComponent } from 'app/vendor/vendor-detail/vendor-detail.component';
import { SaleListComponent } from 'app/sale/sale-list/sale-list.component';
import { SaleDetailComponent } from 'app/sale/sale-detail/sale-detail.component';
import { PrintComponent } from 'app/print/print.component';
import { AuthGaurdService } from '../../auth-gaurd.service';
import { BillListComponent } from 'app/bill/bill-list/bill-list.component';
import { BillDetailComponent } from 'app/bill/bill-detail/bill-detail.component';
import { JobCardListComponent } from 'app/jobcard/jobcard-list/jobcard-list.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent ,canActivate:[AuthGaurdService]},
    { path: 'user-profile',   component: UserProfileComponent,canActivate:[AuthGaurdService] },
    { path: 'user-profile/:id',   component: UserProfileComponent,canActivate:[AuthGaurdService] },
    { path: 'table-list',     component: TableListComponent ,canActivate:[AuthGaurdService]},
    { path: 'jobcard-list',     component: JobCardListComponent,canActivate:[AuthGaurdService] },
    { path: 'job-list',     component: JobListComponent,canActivate:[AuthGaurdService] },
    { path: 'job-list/:status',     component: JobListComponent,canActivate:[AuthGaurdService] },
    { path: 'job-detail',     component: JobDetailComponent,canActivate:[AuthGaurdService] },
    { path: 'job-detail/:id',   component: JobDetailComponent,canActivate:[AuthGaurdService] },
    { path: 'expense-list',   component: ExpenseListComponent ,canActivate:[AuthGaurdService]},
    { path: 'expense-detail/:id',   component: ExpenseDetailComponent ,canActivate:[AuthGaurdService]},
    { path: 'expense-detail',   component: ExpenseDetailComponent ,canActivate:[AuthGaurdService]},
    { path: 'inventory-detail',   component: InventoryDetailComponent ,canActivate:[AuthGaurdService]},
    { path: 'inventory-detail/:id',   component: InventoryDetailComponent ,canActivate:[AuthGaurdService]},
    { path: 'inventory-list',   component: InventoryListComponent,canActivate:[AuthGaurdService] },
    { path: 'vendor-list',   component: VendorListComponent,canActivate:[AuthGaurdService] },
    { path: 'vendor-detail',   component: VendorDetailComponent,canActivate:[AuthGaurdService] },
    { path: 'vendor-detail/:id',   component: VendorDetailComponent,canActivate:[AuthGaurdService] },
    { path: 'sale-list',   component: SaleListComponent,canActivate:[AuthGaurdService] },
    { path: 'sale-detail',   component: SaleDetailComponent,canActivate:[AuthGaurdService] },
    { path: 'sale-detail/:id',   component: SaleDetailComponent,canActivate:[AuthGaurdService] },
    // { path: 'print',   component: PrintComponent },
    { path: 'print/:id',   component: PrintComponent,canActivate:[AuthGaurdService] },
    { path: 'bill-list',   component: BillListComponent,canActivate:[AuthGaurdService] },
    { path: 'bill-detail/:id',   component: BillDetailComponent,canActivate:[AuthGaurdService] },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
