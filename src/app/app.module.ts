import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LoginComponent } from './components/login/login.component';
import { ApplyLeaveComponent } from './components/apply-leave/apply-leave.component';
import { ExamplesComponent } from './components/examples/examples.component';
import { AngularMaterialModule } from 'src/material.module';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { ApproveLeaveComponent } from './components/approve-leave/approve-leave.component';
import { RejectLeaveComponent } from './components/reject-leave/reject-leave.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { CreateEmpComponent } from './components/Employee/create-emp/create-emp.component';
import { NgChartsModule } from 'ng2-charts';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CardComponent } from './card/card.component';
import { LeavesTableComponent } from './tables/leaves-table/leaves-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LeavesTable2Component } from './tables/leaves-table2/leaves-table2.component';
import { LeaveService } from './services/Leave/leave.service';
import { HttpClientModule } from '@angular/common/http';
import { PendingLeavesComponent } from './tables/pending-leaves/pending-leaves.component';
import { ApprovedLeavesComponent } from './tables/approved-leaves/approved-leaves.component';
import { RejectedLeavesComponent } from './tables/rejected-leaves/rejected-leaves.component';
import { AdminLeaveApplicationsComponent } from './components/Leaves/admin-leave-applications/admin-leave-applications.component';
import { LeaveDetailsCardComponent } from './components/Leaves/leave-details-card/leave-details-card.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { UserService } from './services/User/user.service';
import { ShowEmployeesComponent } from './components/show-employees/show-employees.component';
import { EmployeesComponent } from './tables/employees/employees.component';
import { LeavesInRangeComponent } from './tables/leaves-in-range/leaves-in-range.component';
import { ApplyLeaveTableComponent } from './tables/apply-leave-table/apply-leave-table.component';
import { CalenderComponent } from './components/calender/calender.component';
import { ApplyLeave2Component } from './components/apply-leave2/apply-leave2.component';
import { LeaveApplicationDashboardComponent } from './components/leave-application-dashboard/leave-application-dashboard.component';
import { PaginationExampleComponent } from './components/pagination-example/pagination-example.component';
import { EmpDetailsCardComponent } from './components/emp-details-card/emp-details-card.component';
import { UpdateEmpComponent } from './components/update-emp/update-emp.component';
import { Nav2Component } from './nav2/nav2.component';
import { LeavesCardComponent } from './components/leaves-card/leaves-card.component';
import { AuthenticationServiceService } from './services/authentication-service.service';
import { LogoutComponent } from './components/logout/logout.component';
import { Login2Component } from './components/login2/login2.component';
import { ButtonNavComponent } from './navs/button-nav/button-nav.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ApplyLeaveScreenComponent } from './components/apply-leave-screen/apply-leave-screen.component';
import { UpdateEmpDialogComponent } from './components/update-emp-dialog/update-emp-dialog.component';
import { EmploTabComponent } from './tables/emplo-tab/emplo-tab.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { EmployeViewTabComponent } from './tables/employe-view-tab/employe-view-tab.component';
import { UserAllTabComponent } from './tables/user-all-tab/user-all-tab.component';
import { UserPendingTabComponent } from './tables/user-pending-tab/user-pending-tab.component';
import { UserApprovedTabComponent } from './tables/user-approved-tab/user-approved-tab.component';
import { UserRejectedTabComponent } from './tables/user-rejected-tab/user-rejected-tab.component';
import { UserTabComponent } from './tables/user-tab/user-tab.component';
import { EmpLeaveCardDetailsComponent } from './components/emp-leave-card-details/emp-leave-card-details.component';
import { HolidayService } from './services/holidays/holiday.service';
import { HolidaysDialogeComponent } from './components/holidays-dialoge/holidays-dialoge.component';
import { HolidaysTabComponent } from './tables/holidays-tab/holidays-tab.component';
import { AddHolidaysComponent } from './components/add-holidays/add-holidays.component';
import { UpdateHolidaysComponent } from './components/update-holidays/update-holidays.component';
import { TempComponent } from './components/temp/temp.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ApplyLeaveComponent,

    ExamplesComponent,
    CreateUserComponent,
    UpdateUserComponent,
    UpdatePasswordComponent,
    ApproveLeaveComponent,
    RejectLeaveComponent,
    ForgetPasswordComponent,
    CreateEmployeeComponent,
    CreateEmpComponent,
    NavComponent,
    AdminDashboardComponent,
    CardComponent,
    LeavesTableComponent,
    LeavesTable2Component,
    PendingLeavesComponent,
    ApprovedLeavesComponent,
    RejectedLeavesComponent,
    AdminLeaveApplicationsComponent,
    LeaveDetailsCardComponent,
    ShowEmployeesComponent,
    EmployeesComponent,
    LeavesInRangeComponent,
    ApplyLeaveTableComponent,
    CalenderComponent,
    ApplyLeave2Component,
    LeaveApplicationDashboardComponent,
    PaginationExampleComponent,
    EmpDetailsCardComponent,
    UpdateEmpComponent,
    Nav2Component,
    LeavesCardComponent,
    LogoutComponent,
    Login2Component,
    ButtonNavComponent,
    UserProfileComponent,
    ApplyLeaveScreenComponent,
    UpdateEmpDialogComponent,
    EmploTabComponent,
    AdminLoginComponent,
    UserLoginComponent,
    EmployeViewTabComponent,
    UserAllTabComponent,
    UserPendingTabComponent,
    UserApprovedTabComponent,
    UserRejectedTabComponent,
    UserTabComponent,
    EmpLeaveCardDetailsComponent,
    HolidaysDialogeComponent,
    HolidaysTabComponent,
    AddHolidaysComponent,
    UpdateHolidaysComponent,
    TempComponent,
    AddAdminComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NgChartsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    
    // MatSlideToggleModule,
    // MatFormFieldModule,
    // MatIconModule,
    // MatInputModule,
    // MatDatepickerModule,
    // MatNativeDateModule
  ],
  providers: [
    PendingLeavesComponent,
    LeavesTable2Component,
    ApprovedLeavesComponent,
    RejectedLeavesComponent,
    LeaveService,
    UserService,
    HolidayService,
    AuthenticationServiceService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS,
     useValue: {hasBackdrop: false}},
],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
