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
  restaurants: string | undefined;
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
      customerName: [''],
      fullName: [''],
      email: [''],
      listTastes: [],
      listDiscounts: [],
      listReservations: [],
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

  async addReservation() {
    const customer: Customer = {
      _id: this.reservationForm.get('_id')?.value,
      customerName: this.reservationForm.get('customerName')?.value,
      fullName: this.reservationForm.get('fullName')?.value,
      email: this.reservationForm.get('email')?.value,
      listDiscounts: this.reservationForm.get('listDiscounts')?.value,
      listTastes: this.reservationForm.get('listTastes')?.value,
      listReservations: this.reservationForm.get('listReservations')?.value,
      password: this.reservationForm.get('password')?.value,
      creationDate: this.reservationForm.get('creationDate')?.value,
    }

    let reservation: Reservation = {
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

    let _idrestaurant;
    
    if (this._id !== null) {
      if (this._idreserv !== null) {
        console.log(reservation);
        this._customerService.updateReservation(reservation._id, reservation).subscribe(data => {
          this.router.navigate(['/list-customers/', this._id])
        }, error => {
          console.log(error);
          this.reservationForm.reset();
        })
      }

      else {
        await this._restaurantService.getRestaurantbyName(restaurant.restaurantName).subscribe(data => {
          reservation._idRestaurant = data._id;
          if (this._id != null) {
            reservation._idCustomer = this._id;
            this._customerService.addReservation(reservation).subscribe(data => {
              this.router.navigate(['/list-customers/', this._id]);
            }, error => {
              console.log(error);
              this.reservationForm.reset();
            })
          }
        })
      }
    }
  }

  getCustomerInfo() {
    if(this._idreserv !== null && this._id !== null) {
      let restaurant: string;
      this.title = "Edit Reservation"

      this._customerService.getCustomerbyID(this._id).subscribe(data => {
        this.delReservsFromCustomer(data);
        this.restaurants = '';

        this._restaurantService.getRestaurantbyID(data.listReservations[0]._idRestaurant).subscribe(data1 => {
          restaurant = data1.restaurantName;
          this.restaurants = restaurant;

        this.reservationForm.setValue({
          _id: data._id,
          customerName: data.customerName,
          fullName: data.fullName,
          email: data.email,
          listTastes: data.listTastes,
          listDiscounts: data.listDiscounts,
          listReservations: data.listReservations,
          password: data.password,
          creationDate: data.creationDate,
          
          _idreserv: data.listReservations[0]._id,
          _idCustomer: data.listReservations[0]._idCustomer,
          _idRestaurant: data.listReservations[0]._idRestaurant,
          dateReservation: data.listReservations[0].dateReservation,
          timeReservation: data.listReservations[0].timeReservation,
          creationDateReservation: data.listReservations[0].creationDate,

          restaurantName: data1.restaurantName
        })
        })
      })
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

  deleteReservation() {
    if(confirm("Are you sure to delete the reservation?")) {
      if (this._idreserv !== null && this.customer !== undefined && this._id !== null) {
        for (var i = this.customer.listReservations.length - 1; i >= 0; i -= 1) {
          if (this.customer.listReservations[i]._id == this._idreserv) {
            this.customer.listReservations.splice(i, 1);
          }
        }
      
        this._customerService.deleteReservation(this._idreserv).subscribe(data => {
          console.log("Reservation deleted");
          this.router.navigate(['/list-customers', this._id]);
        }, error => {
          console.log(error);
        });
      }
    }
  }
}
