import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurants';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-add-profile',
  templateUrl: './restaurant-add-profile.component.html',
  styleUrls: ['./restaurant-add-profile.component.css']
})
export class RestaurantAddProfileComponent implements OnInit {
  restaurant: Restaurant | undefined;
  restForm: FormGroup;
  title = "Restaurant Information";
  _id: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private _restaurantService: RestaurantService,
              private aRouter: ActivatedRoute) { 
    this.restForm = this.fb.group({
      _id: ['', Validators.required],
      restaurantName: ['', Validators.required],
      ownerName: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      photos: [{ }],
      rating: [''],
      listTags: [{
        tagName: [''],
      }],
      listDishes: [{ }],
      creationDate: ['', Validators.required],
    });

    this._id = this.aRouter.snapshot.paramMap.get('_id');
    console.log(this._id);
  }

  ngOnInit(): void {
    this.getRestaurantInfo();
  }

  addRestaurant() {
    const restaurant: Restaurant = {
      _id: this.restForm.get('_id')?.value,
      restaurantName: this.restForm.get('restaurantName')?.value,
      owner: this.restForm.get('owner')?.value,
      email: this.restForm.get('email')?.value,
      address: this.restForm.get('address')?.value,
      description: this.restForm.get('description')?.value,
      photos: this.restForm.get('photos')?.value,
      rating: this.restForm.get('rating')?.value,
      listTags: this.restForm.get('listTags')?.value,
      listDishes: this.restForm.get('listDishes')?.value,
      creationDate: this.restForm.get('creationDate')?.value,
    }
    
    if (this._id !== 'add-restaurant' && this._id !== null) {
      this._restaurantService.updateRestaurant(restaurant._id, restaurant).subscribe(data => {
        this.router.navigate(['/list-restaurants/', restaurant._id])
      }, error => {
        console.log(error);
        this.restForm.reset();
      })
    }
  }

  getRestaurantInfo() {
    if(this._id !== null) {
      this.title = "Editable Information";
      this._restaurantService.getRestaurantbyID(this._id).subscribe(data => {
        this.restaurant = data;
        this.restForm.setValue({
          _id: data._id,
          restaurantName: data.restaurantName,
          ownerName: data.owner.ownerName,
          email: data.email,
          address: data.address,
          description: data.description,
          photos: data.photos,
          rating: data.rating,
          creationDate: data.creationDate,
          listTags: data.listTags,
          listDishes: data.listDishes,
        })
      })
    }
  }

  deleteRestaurant() {
    if(confirm("Are you sure to delete the restaurant?")) {
      if (this._id !== null) {
        this._restaurantService.deleteRestaurant(this._id).subscribe(data => {
          console.log("User deleted");
          this.router.navigate(['/list-restaurants']);
        }, error => {
          console.log(error);
        });
      }
    }
    else {
      this.router.navigate(['/list-restaurants', this._id]);
    }
  }
}
