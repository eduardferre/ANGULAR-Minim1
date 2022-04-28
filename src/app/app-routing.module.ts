import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components

import { CustomerProfileComponent } from './components/components-customers/customer-profile/customer-profile.component';
import { CustomersListComponent } from './components/components-customers/customers-list/customers-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OwnerProfileComponent } from './components/components-owners/owner-profile/owner-profile.component';
import { RestaurantProfileComponent } from './components/components-restaurants/restaurant-profile/restaurant-profile.component';
import { CustomerAddProfileComponent } from './components/components-customers/customer-add-profile/customer-add-profile.component';
import { CustomerAddTastesComponent } from './components/components-customers/customer-add-tastes/customer-add-tastes.component';
import { CustomerAddReservationsComponent } from './components/components-customers/customer-add-reservations/customer-add-reservations.component';
import { CustomerAddDiscountsComponent } from './components/components-customers/customer-add-discounts/customer-add-discounts.component';
import { RestaurantsListComponent } from './components/components-restaurants/restaurants-list/restaurants-list.component';
import { OwnersListComponent } from './components/components-owners/owners-list/owners-list.component';
import { OwnersAddProfileComponent } from './components/components-owners/owners-add-profile/owners-add-profile.component';
import { OwnersAddRestaurantsComponent } from './components/components-owners/owners-add-restaurants/owners-add-restaurants.component';
import { RestaurantAddTastesComponent } from './components/components-restaurants/restaurant-add-tastes/restaurant-add-tastes.component';
import { RestaurantAddProfileComponent } from './components/components-restaurants/restaurant-add-profile/restaurant-add-profile.component';
import { RestaurantAddDishesComponent } from './components/components-restaurants/restaurant-add-dishes/restaurant-add-dishes.component';
import { DenunciasEditComponent } from './components/dashboard/denuncias-edit/denuncias-edit.component';

// Routes

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'add-denuncia', component: DenunciasEditComponent},
  { path: ':_id/edit-denuncia', component: DenunciasEditComponent },


  { path: 'list-customers/add-customer', component: CustomerAddProfileComponent},
  { path: 'list-customers', component: CustomersListComponent},
  { path: 'list-customers/:_id', component: CustomerProfileComponent},
  { path: 'list-customers/:_id/edit-customer', component: CustomerAddProfileComponent},
  { path: 'list-customers/:_id/add-taste', component: CustomerAddTastesComponent},
  { path: 'list-customers/:_id/:nameTaste/edit-taste', component: CustomerAddTastesComponent},
  { path: 'list-customers/:_id/add-reservation', component: CustomerAddReservationsComponent},
  { path: 'list-customers/:_id/:_idreserv/edit-reservation', component: CustomerAddReservationsComponent},
  { path: 'list-customers/:_id/add-discount', component: CustomerAddDiscountsComponent},
  { path: 'list-customers/:_id/:nameDisc/:amountDisc/edit-discount', component: CustomerAddDiscountsComponent},

  { path: 'list-owners/add-owner', component: OwnersAddProfileComponent},
  { path: 'list-owners', component: OwnersListComponent},
  { path: 'list-owners/:_id', component: OwnerProfileComponent},
  { path: 'list-owners/:_id/edit-owner', component: OwnersAddProfileComponent},
  { path: 'list-owners/:_id/add-restaurant', component: OwnersAddRestaurantsComponent},
  { path: 'list-owners/:_id/:_idrest/edit-restaurant', component: OwnersAddRestaurantsComponent},

  { path: 'list-restaurants/add-restaurant', component: RestaurantAddProfileComponent},
  { path: 'list-restaurants', component: RestaurantsListComponent},
  { path: 'list-restaurants/:_id', component: RestaurantProfileComponent},
  { path: 'list-restaurants/:_id/edit-restaurant', component: RestaurantAddProfileComponent},
  { path: 'list-restaurants/:_id/add-taste', component: RestaurantAddTastesComponent},
  { path: 'list-restaurants/:_id/:nameTaste/edit-taste', component: RestaurantAddTastesComponent},
  { path: 'list-restaurants/:_id/add-dish', component: RestaurantAddDishesComponent},
  { path: 'list-restaurants/:_id/:nameDish/edit-dish', component: RestaurantAddDishesComponent},
  
  { path: '**', redirectTo: '', pathMatch: 'full'} // In case of a wrong URL, the code redirects to the main path

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
