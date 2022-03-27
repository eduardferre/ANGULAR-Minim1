import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components

import { CustomerProfileComponent } from './components/components-customers/customer-profile/customer-profile.component';
import { CustomersListComponent } from './components/components-customers/customers-list/customers-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OwnerProfileComponent } from './components/owner-profile/owner-profile.component';
import { OwnersComponent } from './components/owners/owners.component';
import { RestaurantProfileComponent } from './components/restaurant-profile/restaurant-profile.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { CustomerAddProfileComponent } from './components/components-customers/customer-add-profile/customer-add-profile.component';
import { CustomerAddTastesComponent } from './components/components-customers/customer-add-tastes/customer-add-tastes.component';
import { CustomerAddReservationsComponent } from './components/components-customers/customer-add-reservations/customer-add-reservations.component';
import { CustomerAddDiscountComponent } from './components/components-customers/customer-add-discount/customer-add-discount.component';

// Routes

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'list-customers/add-customer', component: CustomerAddProfileComponent},
  { path: 'list-customers', component: CustomersListComponent},
  { path: 'list-customers/:_id', component: CustomerProfileComponent},
  { path: 'list-customers/:_id/edit-customer', component: CustomerAddProfileComponent},
  { path: 'list-customers/:_id/add-taste', component: CustomerAddTastesComponent},
  { path: 'list-customers/:_id/:_idtaste/edit-taste', component: CustomerAddTastesComponent},
  { path: 'list-customers/:_id/add-reservation', component: CustomerAddReservationsComponent},
  { path: 'list-customers/:_id/:_idtaste/edit-reservation', component: CustomerAddReservationsComponent},
  { path: 'list-customers/:_id/add-discount', component: CustomerAddDiscountComponent},
  { path: 'list-customers/:_id/:_iddiscount/edit-discount', component: CustomerAddDiscountComponent},


  { path: 'list-owners', component: OwnersComponent},
  { path: 'list-owners/:_id', component: OwnerProfileComponent},
  { path: 'list-restaurants', component: RestaurantsComponent},
  { path: 'list-restaurants/:_id', component: RestaurantProfileComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'} // In case of a wrong URL, the code redirects to the main path

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
