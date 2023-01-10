import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ApplyLeaveComponent } from './components/apply-leave/apply-leave.component';
import { ApplyLeave2Component } from './components/apply-leave2/apply-leave2.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { CreateEmpComponent } from './components/Employee/create-emp/create-emp.component';
import { LeaveApplicationDashboardComponent } from './components/leave-application-dashboard/leave-application-dashboard.component';
import { AdminLeaveApplicationsComponent } from './components/Leaves/admin-leave-applications/admin-leave-applications.component';
// import { AdminLeaveApplicationsComponent } from './components/Leaves/admin-leave-applications/admin-leave-applications.component';
import { LoginComponent } from './components/login/login.component';
import { Login2Component } from './components/login2/login2.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PaginationExampleComponent } from './components/pagination-example/pagination-example.component';
import { ShowEmployeesComponent } from './components/show-employees/show-employees.component';
import { TempComponent } from './components/temp/temp.component';
import { UpdateEmpComponent } from './components/update-emp/update-emp.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGaurdService } from './services/AuthGaurd/auth-gaurd.service';
import { ApplyLeaveTableComponent } from './tables/apply-leave-table/apply-leave-table.component';
import { EmploTabComponent } from './tables/emplo-tab/emplo-tab.component';
import { EmployeViewTabComponent } from './tables/employe-view-tab/employe-view-tab.component';

import { EmployeesComponent } from './tables/employees/employees.component';
import { HolidaysTabComponent } from './tables/holidays-tab/holidays-tab.component';
import { PendingLeavesComponent } from './tables/pending-leaves/pending-leaves.component';
import { UserTabComponent } from './tables/user-tab/user-tab.component';


const routes: Routes = [

//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   // {path:'createUser', component: CreateUserComponent},
//   // path: '', component: EmployeeComponent,canActivate:[AuthGaurdService]
//   {path:'login', component: LoginComponent},
//   {path:'createEmp', component: CreateEmpComponent},
//   {path:'employees', component: EmployeesComponent},  
//   // {path:'createEmployee', component: CreateEmployeeComponent},
//   { path: 'dashboard', component: AdminDashboardComponent },
//  // menuItems = ['leave applications', 'apply leave', 'employees', 'sign out'];
//   // { path: 'leave applications', component: AdminDashboardComponent },
//   { path: 'leave applications', component: AdminLeaveApplicationsComponent },
//   // { path: 'apply leave', component: ApplyLeaveTableComponent },
//   { path: 'apply leave', component: ApplyLeave2Component },
//   { path: 'employees', component: AdminDashboardComponent },
//   { path: 'sign out', component: AdminDashboardComponent },
//   { path: 'paginator', component: PaginationExampleComponent },
//   { path: 'updateEmp', component: UpdateEmpComponent },
//   { path: 'userLeaveApp', component: LeaveApplicationDashboardComponent },
//   { path: 'logout', component: LogoutComponent },
// */
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{path:'employees', component: EmployeesComponent,canActivate:[AuthGaurdService]},
{path:'employee-view', component: UserTabComponent,canActivate:[AuthGaurdService]},

// {path:'employee-view', component: EmployeViewTabComponent,canActivate:[AuthGaurdService]},
// {path:'employee-view', component: EmploTabComponent,canActivate:[AuthGaurdService]},

{path:'holidays', component: HolidaysTabComponent,canActivate:[AuthGaurdService]},

{ path: 'leaveApplications', component: LeaveApplicationDashboardComponent,canActivate:[AuthGaurdService] },
{ path: 'myProfile', component: UserProfileComponent,canActivate:[AuthGaurdService] },
{ path: 'admin-register', component: AddAdminComponent}, 

{ path: 'admin-login', component: AdminLoginComponent}, 
{path:'login', component: UserLoginComponent},
{path:'temp', component: TempComponent},

// {path:'login', component: Login2Component},
{path:'createEmp', component: CreateEmpComponent,canActivate:[AuthGaurdService]},
// { path: 'leaveapplications1', component: AdminLeaveApplicationsComponent,canActivate:[AuthGaurdService] },
{ path: 'applyLeave', component: ApplyLeave2Component,canActivate:[AuthGaurdService] },
{ path: 'updateEmp', component: UpdateEmpComponent ,canActivate:[AuthGaurdService]},
{ path: 'logout', component: LogoutComponent ,canActivate:[AuthGaurdService]}, 
{ path: 'logout', component: LogoutComponent ,canActivate:[AuthGaurdService]}, 

// { path: 'pendingTable', component: PendingLeavesComponent}, 


  // {path:'createUser', component: CreateUserComponent},
  // path: '', component: EmployeeComponent,canActivate:[AuthGaurdService]
  // {path:'employees', component: EmployeesComponent},  
  // {path:'createEmployee', component: CreateEmployeeComponent},
  // { path: 'dashboard', component: AdminDashboardComponent },
 // menuItems = ['leave applications', 'apply leave', 'employees', 'sign out'];
  // { path: 'leave applications', component: AdminDashboardComponent },
  // { path: 'apply leave', component: ApplyLeaveTableComponent },
  // { path: 'employees', component: AdminDashboardComponent, },
  // { path: 'sign out', component: AdminDashboardComponent },
  // { path: 'paginator', component: PaginationExampleComponent },
  // { path: 'userLeaveApp', component: LeaveApplicationDashboardComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
