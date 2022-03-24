import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components

import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { CustomersComponent } from './components/customers/customers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OwnerProfileComponent } from './components/owner-profile/owner-profile.component';
import { OwnersComponent } from './components/owners/owners.component';
import { RestaurantProfileComponent } from './components/restaurant-profile/restaurant-profile.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';

// Routes
const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'list-customers', component: CustomersComponent},
  { path: 'list-customers/:_id', component: CustomerProfileComponent},
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
