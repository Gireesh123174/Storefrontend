import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { HttpClientModule } from '@angular/common/http'; // Add this
import { FormsModule } from '@angular/forms';
import { NgSimpleStateModule } from 'ng-simple-state';
import { App } from './app';
import { Home } from './pages/home/home';
import { Billing } from './pages/billing/billing';
import { Inventory } from './pages/inventory/inventory';
import { Additems } from './pages/additems/additems';
import { Report } from './pages/report/report';
import { Payment } from './pages/payment/payment';

@NgModule({
  declarations: [
    App,
    Home,
    Billing,
    Inventory,
    Additems,
    Report,
    Payment
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
