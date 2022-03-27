import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { OwnersComponent } from './components/owners/owners.component';
import { CustomerProfileComponent } from './components/components-customers/customer-profile/customer-profile.component';
import { OwnerProfileComponent } from './components/owner-profile/owner-profile.component';
import { RestaurantProfileComponent } from './components/restaurant-profile/restaurant-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerAddProfileComponent } from './components/components-customers/customer-add-profile/customer-add-profile.component';
import { CustomerAddTastesComponent } from './components/components-customers/customer-add-tastes/customer-add-tastes.component';
import { CustomerAddReservationsComponent } from './components/components-customers/customer-add-reservations/customer-add-reservations.component';
import { CustomersListComponent } from './components/components-customers/customers-list/customers-list.component';
import { CustomerAddDiscountComponent } from './components/components-customers/customer-add-discount/customer-add-discount.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent,
    OwnersComponent,
    CustomerProfileComponent,
    CustomersListComponent,
    OwnerProfileComponent,
    RestaurantProfileComponent,
    DashboardComponent,
    CustomerAddProfileComponent,
    CustomerAddTastesComponent,
    CustomerAddReservationsComponent,
    CustomerAddDiscountComponent,
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
