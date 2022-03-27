import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { CustomerProfileComponent } from './components/components-customers/customer-profile/customer-profile.component';
import { OwnerProfileComponent } from './components/components-owners/owner-profile/owner-profile.component';
import { RestaurantProfileComponent } from './components/components-restaurants/restaurant-profile/restaurant-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerAddProfileComponent } from './components/components-customers/customer-add-profile/customer-add-profile.component';
import { CustomerAddTastesComponent } from './components/components-customers/customer-add-tastes/customer-add-tastes.component';
import { CustomerAddReservationsComponent } from './components/components-customers/customer-add-reservations/customer-add-reservations.component';
import { CustomersListComponent } from './components/components-customers/customers-list/customers-list.component';
import { RestaurantsListComponent } from './components/components-restaurants/restaurants-list/restaurants-list.component';
import { OwnersAddProfileComponent } from './components/components-owners/owners-add-profile/owners-add-profile.component';
import { OwnersAddRestaurantsComponent } from './components/components-owners/owners-add-restaurants/owners-add-restaurants.component';
import { CustomerAddDiscountsComponent } from './components/components-customers/customer-add-discounts/customer-add-discounts.component';
import { OwnersListComponent } from './components/components-owners/owners-list/owners-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersListComponent,
    CustomerProfileComponent,
    CustomerAddProfileComponent,
    CustomerAddTastesComponent,
    CustomerAddReservationsComponent,
    CustomerAddDiscountsComponent,
    OwnerProfileComponent,
    RestaurantProfileComponent,
    DashboardComponent,
    OwnersListComponent,
    RestaurantsListComponent,
    OwnersAddProfileComponent,
    OwnersAddRestaurantsComponent,
    
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
