import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChequesComponent } from './pages/cheques/cheques.component';


const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cheque', component: ChequesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
