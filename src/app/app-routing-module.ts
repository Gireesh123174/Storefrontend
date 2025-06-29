import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Billing } from './pages/billing/billing';
import { Inventory } from './pages/inventory/inventory';
import { Additems } from './pages/additems/additems';
import { Report } from './pages/report/report';
import { Payment } from './pages/payment/payment';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'billing', component: Billing },
  { path: 'inventory', component: Inventory },
  { path: 'add-items', component: Additems },
  { path: 'report', component: Report },
  { path: 'payment', component:Payment},
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect invalid routes to Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }