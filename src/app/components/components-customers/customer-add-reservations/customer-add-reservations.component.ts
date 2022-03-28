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
  selector: 'app-customer-add-reservations',
  templateUrl: './customer-add-reservations.component.html',
  styleUrls: ['./customer-add-reservations.component.css']
})
export class CustomerAddReservationsComponent implements OnInit {
  customer: Customer | undefined;
  reservation: Reservation | undefined;
  restaurant: Restaurant | undefined;
  reservationForm: FormGroup;
  title = "NEW COSTUMER";
  _id: string | null;
  _idreserv: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private toastr: ToastrService,
              private _customerService: CustomerService,
              private _restaurantService: RestaurantService,
              private aRouter: ActivatedRoute) { 
    this.reservationForm = this.fb.group({
      _id: [''],
      customerName: ['', Validators.required],
      fullName: [''],
      email: [''],
      listTastes: [],
      listDiscounts: [],
      listReservations: [{
        _id: [''],
      }],
      password: [''],
      creationDate: [],

      _idreserv: [''],
      _idCustomer: [''],
      _idRestaurant: [''],
      dateReservation: ['', Validators.required],
      timeReservation: ['', Validators.required],
      creationDateReservation: [''],

      restaurantName: ['', Validators.required]
    });

  this._id = this.aRouter.snapshot.paramMap.get('_id');
  console.log(this._id);
  this._idreserv = this.aRouter.snapshot.paramMap.get('_idreserv');
  console.log(this._idreserv);
}

  ngOnInit(): void {
    this.getCustomerInfo();
  }

  addReservation() {
    const customer: Customer = {
      _id: this.reservationForm.get('_id')?.value,
      customerName: this.reservationForm.get('customerName')?.value,
      fullName: this.reservationForm.get('fullName')?.value,
      email: this.reservationForm.get('email')?.value,
      listDiscounts: this.reservationForm.get('listDiscounts')?.value,
      listTastes: this.reservationForm.get('listTastes')?.value,
      listReservations: [{
        _id: this.reservationForm.value.listReservations._id,
      }],
      password: this.reservationForm.get('password')?.value,
      creationDate: this.reservationForm.get('creationDate')?.value,
    }

    const reservation: Reservation = {
      _id: this.reservationForm.get('_idreserv')?.value,
      _idCustomer: this.reservationForm.get('_idCustomer')?.value,
      _idRestaurant: this.reservationForm.get('_idRestaurant')?.value,
      dateReservation: this.reservationForm.get('dateReservation')?.value,
      timeReservation: this.reservationForm.get('timeReservation')?.value,
      creationDate: this.reservationForm.get('creationDate')?.value,
    }

    const restaurant: Restaurant = {
      _id: this.reservationForm.get('_idRestaurant')?.value,
      _idOwner: this.reservationForm.get('_idOwner')?.value,
      restaurantName: this.reservationForm.get('restaurantName')?.value,
      email: this.reservationForm.get('restemail')?.value,
      address: this.reservationForm.get('address')?.value,
      description: this.reservationForm.get('description')?.value,
      photos: this.reservationForm.get('photos')?.value,
      rating: this.reservationForm.get('rating')?.value,
      creationDate: this.reservationForm.get('creationDateRest')?.value,
      listTags: [{
          tagName: this.reservationForm.get('tagNameRest')?.value,
      }],
      listMenus: this.reservationForm.get('listMenus')?.value,
    }
    
    if (this._id !== null) {
      if (this._idreserv !== null) {
        this.addReservsToCustomer(customer);
        this._customerService.addReservation(reservation).subscribe(data => {
          this.router.navigate(['/list-customers/', this._id])
        }, error => {
          console.log(error);
          this.reservationForm.reset();
        })
      }

      else {
        this._customerService.addReservation(reservation).subscribe(data => {
          this.router.navigate(['/list-customers/', this._id]);
        }, error => {
          console.log(error);
          this.reservationForm.reset();
        })
      }
    }
  }

  getCustomerInfo() {
    if(this._idreserv !== null && this._id !== null) {
      this.title = "Edit Reservation"
      this._customerService.getCustomerbyID(this._id).subscribe(data => {
        this.delReservsFromCustomer(data);
        this.reservationForm.setValue({
          _id: data._id,
          customerName: data.customerName,
          fullName: data.fullName,
          email: data.email,
          listDiscounts: data.listDiscounts,
          listReservations: {
            _id: data.listReservations[0]._id,
          },
          password: data.password,
          creationDate: data.creationDate,
        })
      })
      
      this._customerService.getReservationbyID(this._id).subscribe(data => {
        this.reservation = data;
        this.reservationForm.setValue({
          _idreserv: data._id,
          _idCustomer: data._idCustomer,
          _idRestaurant: data._idRestaurant,
          dateReservation: data.dateReservation,
          timeReservation: data.timeReservation,
          creationDateReservation: data.creationDate,
        })
      })

      if (this.reservation?._idRestaurant !== undefined) {
        this._restaurantService.getRestaurantbyID(this.reservation?._idRestaurant).subscribe(data => {
          this.restaurant = data;
          this.reservationForm.setValue({
            restaurantName: data.restaurantName,
          })
        })
      }
    }
  }

  addReservsToCustomer(cust: Customer) {
    if (this.customer !== undefined) {
      for (var i = this.customer?.listReservations.length - 1; i >= 0; i -= 1) {
        if (this.customer?.listReservations[i]._id !== this._idreserv) {
          cust.listReservations.push(this.customer.listReservations[i]);
        }
      }
    }
  }

  delReservsFromCustomer(cust: Customer) {
    if (this._id !== null) {
      for (var i = cust.listReservations.length - 1; i >= 0; i -= 1) {
        if (cust.listReservations[i]._id !== this._idreserv) {
          cust.listReservations.splice(i, 1);
        }
      }

      this._customerService.getCustomerbyID(this._id).subscribe(data => {
        this.customer = data;
      })
    }
  }

}
