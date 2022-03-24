import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { OwnersComponent } from './components/owners/owners.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { OwnerProfileComponent } from './components/owner-profile/owner-profile.component';
import { RestaurantProfileComponent } from './components/restaurant-profile/restaurant-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    RestaurantsComponent,
    OwnersComponent,
    CustomerProfileComponent,
    OwnerProfileComponent,
    RestaurantProfileComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
