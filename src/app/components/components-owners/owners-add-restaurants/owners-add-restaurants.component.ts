import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/models/owners';
import { Restaurant } from 'src/app/models/restaurants';
import { RestaurantADD } from 'src/app/models/restaurantsADD';
import { OwnerService } from 'src/app/services/owner.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-owners-add-restaurants',
  templateUrl: './owners-add-restaurants.component.html',
  styleUrls: ['./owners-add-restaurants.component.css']
})
export class OwnersAddRestaurantsComponent implements OnInit {
  owner: Owner | undefined;
  restaurant: Restaurant | undefined;
  restaurantForm: FormGroup;
  title = "Owner Information";
  _id: string | null;
  _idrest: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private _ownerService: OwnerService,
              private _restaurantService: RestaurantService,
              private aRouter: ActivatedRoute) { 
    this.restaurantForm = this.fb.group({
      _id: [''],
      ownerName: [''],
      fullName: [''],
      email: [''],
      listRestaurants: [{
        _id: [''],
      }],
      password: [''],
      creationDate: [''],

      _idrest: [''],
      restaurantName: ['', Validators.required],
      restEmail: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      photos: [{}],
      rating: 0,
      listTags: [{
        tagNameRest: [''],
      }],
      listDishes: [{}],
      creationDateRest: [''],

    });

    this._id = this.aRouter.snapshot.paramMap.get('_id');
    console.log(this._id);
    this._idrest = this.aRouter.snapshot.paramMap.get('_idrest');
    console.log(this._idrest);
  }

  ngOnInit(): void {
    this.getOwnerInfo();
  }

  async addRestaurant() {
    const owner: Owner = {
      _id: this.restaurantForm.get('_id')?.value,
      ownerName: this.restaurantForm.get('ownerName')?.value,
      fullName: this.restaurantForm.get('fullName')?.value,
      email: this.restaurantForm.get('email')?.value,
      listRestaurants: this.restaurantForm.get('listRestaurants')?.value,
      password: this.restaurantForm.get('password')?.value,
      creationDate: this.restaurantForm.get('creationDate')?.value,
    }

    const restaurant: RestaurantADD = {
      _id: this.restaurantForm.get('_idrest')?.value,
      owner: this.restaurantForm.get('owner')?.value,
      restaurantName: this.restaurantForm.get('restaurantName')?.value,
      email: this.restaurantForm.get('restEmail')?.value,
      address: this.restaurantForm.get('address')?.value,
      description: this.restaurantForm.get('description')?.value,
      photos: this.restaurantForm.get('photos')?.value,
      rating: this.restaurantForm.get('rating')?.value,
      creationDate: this.restaurantForm.get('creationDateRest')?.value,
      listTags: [{ 
        tagName: this.restaurantForm.get('tagNameRest')?.value,
      }],
      listDishes: this.restaurantForm.get('listDishes')?.value,
    }

    
    if (this._id !== null) {
      restaurant.owner = this._id;

      if (this._idrest !== null) {
        console.log(restaurant);
        this._restaurantService.updateRestaurantADD(this._idrest, restaurant).subscribe(data => {
          this.router.navigate(['/list-owners/', this._id])
        }, error => {
          console.log(error);
          this.restaurantForm.reset();
        })
      }

      else {
        console.log(restaurant);
        this._restaurantService.addRestaurant(restaurant).subscribe(data => {
          this._restaurantService.getRestaurantbyName(restaurant.restaurantName).subscribe(data => {
            let rest: Restaurant = data;
            rest.listTags = [{
              tagName: "Restaurant",
            }],
            rest.rating = 0;

            this._restaurantService.updateRestaurant(data._id, rest).subscribe(data => {
              
            })
          })
          this.router.navigate(['/list-owners/', this._id]);
        }, error => {
          console.log(error);
          this.restaurantForm.reset();
        })
      }
    }
  }

  getOwnerInfo() {
    if(this._id !== null && this._idrest !== null) {
      this.title = "Edit Restaurant";

      this._ownerService.getOwnerbyID(this._id).subscribe(data => {
        this.delRestaurantsFromOwner(data);
        this._restaurantService.getRestaurantbyID(data.listRestaurants[0]._id).subscribe(data1 => {
          this.owner = data;
          this.restaurant = data1;
          this.restaurantForm.setValue({
            _id: data._id,
            ownerName: data.ownerName,
            fullName: data.fullName,
            email: data.email,
            listRestaurants: data.listRestaurants,
            password: data.password,
            creationDate: data.creationDate,

            _idrest: data1._id,
            restaurantName: data1.restaurantName,
            restEmail: data1.email,
            address: data1.address,
            description: data1.description,
            photos: data1.photos,
            rating: data1.rating,
            listTags: data1.listTags,
            listDishes: data1.listDishes,
            creationDateRest: data1.creationDate,
          })
        })
      })
    }
  }

  addRestaurantsToOwner(owner: Owner) {
    if (this.owner !== undefined) {
      for (var i = this.owner?.listRestaurants.length - 1; i >= 0; i -= 1) {
        if (this.owner?.listRestaurants[i]._id !== this._idrest) {
          owner.listRestaurants.push(this.owner.listRestaurants[i]);
        }
      }
    }
  }

  delRestaurantsFromOwner(owner: Owner) {
    if (this._id !== null) {
      for (var i = owner.listRestaurants.length - 1; i >= 0; i -= 1) {
        if (owner.listRestaurants[i]._id !== this._idrest) {
          owner.listRestaurants.splice(i, 1);
        }
      }

      this._ownerService.getOwnerbyID(this._id).subscribe(data => {
        this.owner = data;
      })
    }
  }

  deleteRestaurant() {
    if(confirm("Are you sure to delete the restaurant?")) {
      if (this._idrest !== null) {
        this._restaurantService.deleteRestaurant(this._idrest).subscribe(data => {
          console.log("Restaurant deleted");
          this.router.navigate(['/list-owners', this._id]);
        }, error => {
          console.log(error);
        });
      }
    }
    else {
      this.router.navigate(['/list-owners', this._id]);
    }
  }
}

