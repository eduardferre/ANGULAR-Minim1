import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { Owner } from 'src/app/models/owners';
import { Reservation } from 'src/app/models/reservations';
import { Restaurant } from 'src/app/models/restaurants';
import { CustomerService } from 'src/app/services/customer.service';
import { OwnerService } from 'src/app/services/owner.service';
import { RestaurantService } from 'src/app/services/restaurant.service';


@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  customer: Customer | undefined;
  restaurants: [string] | undefined;
  title = "Customer Information";
  _id: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private toastr: ToastrService,
              private _customerService: CustomerService,
              private _restaurantService: RestaurantService,
              private aRouter: ActivatedRoute) { 

  this._id = this.aRouter.snapshot.paramMap.get('_id');
  console.log(this._id);
}

  ngOnInit(): void {
    this.getCustomerInfo();
  }

  async getCustomerInfo() {
    if(this._id !== null) {
      let restaurant: string;

      this._customerService.getCustomerbyID(this._id).subscribe(data => {
        this.customer = data;
        console.log(data);
        this.restaurants = [''];
        this.restaurants?.pop();
        
        data.listReservations.forEach(rest => {
          this._restaurantService.getRestaurantbyID(rest._idRestaurant).subscribe(data => {
            restaurant = data.restaurantName;
            this.restaurants?.push(restaurant);
          })
        });
      })
    }
  }
}
