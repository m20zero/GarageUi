import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { LoginComponent } from '../../login/login.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatSliderModule,
  MatAutocompleteModule,
  MatAccordion,
  MatExpansionModule,
  MatCardModule
} from '@angular/material';
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
import { NgxPrintModule } from 'ngx-print';
import { BillListComponent } from 'app/bill/bill-list/bill-list.component';
import { BillDetailComponent } from 'app/bill/bill-detail/bill-detail.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { JobCardListComponent } from 'app/jobcard/jobcard-list/jobcard-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxPrintModule,
    MatRippleModule,
    MatSliderModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTooltipModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    JobCardListComponent,
    BillListComponent,
    BillDetailComponent,
    PrintComponent,
    DashboardComponent,
    VendorListComponent,
    SaleDetailComponent,
    VendorDetailComponent,
    SaleListComponent,
    UserProfileComponent,
    TableListComponent,
    InventoryListComponent,
    InventoryDetailComponent,
    JobListComponent,
    JobDetailComponent,
    ExpenseDetailComponent,
    ExpenseListComponent,
    TypographyComponent,
    IconsComponent,
    // LoginComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
  ]
})

export class AdminLayoutModule {}
