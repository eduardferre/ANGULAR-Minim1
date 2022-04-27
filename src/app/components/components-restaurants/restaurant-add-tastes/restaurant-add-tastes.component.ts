import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurants';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-add-tastes',
  templateUrl: './restaurant-add-tastes.component.html',
  styleUrls: ['./restaurant-add-tastes.component.css']
})
export class RestaurantAddTastesComponent implements OnInit {
  restaurant: Restaurant | undefined;
  restForm: FormGroup;
  title = "ADD TASTE";
  nameTaste: string | null;
  _id: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private _restaurantService: RestaurantService,
              private aRouter: ActivatedRoute) { 
    this.restForm = this.fb.group({
      _id: [''],
      restaurantName: [''],
      ownerName: [''],
      email: [''],
      address: [''],
      description: [''],
      photos: [{ }],
      rating: [''],
      listTags: this.fb.group({
        tagName: ['', Validators.required]
      }),
      listDishes: [{ }],
      creationDate: [''],
    });

    this._id = this.aRouter.snapshot.paramMap.get('_id');
    console.log(this._id);
    this.nameTaste = this.aRouter.snapshot.paramMap.get('nameTaste');
    console.log(this.nameTaste);
  }

  ngOnInit(): void {
    this.getRestaurantInfo();
  }

  addTaste() {
    const restaurant: Restaurant = {
      _id: this.restForm.get('_id')?.value,
      restaurantName: this.restForm.get('restaurantName')?.value,
      owner: this.restForm.get('owner')?.value,
      email: this.restForm.get('email')?.value,
      address: this.restForm.get('address')?.value,
      description: this.restForm.get('description')?.value,
      photos: this.restForm.get('photos')?.value,
      rating: this.restForm.get('rating')?.value,
      listTags: [{
        tagName: this.restForm.value.listTags.tagName,
      }],
      listDishes: this.restForm.get('listDishes')?.value,
      creationDate: this.restForm.get('creationDate')?.value,
    }
    
    if (this._id !== null) {
      this.addTastesToRestaurant(restaurant);
      this._restaurantService.updateRestaurant(this._id, restaurant).subscribe(data => {
        this.router.navigate(['/list-restaurants/', this._id])
      }, error => {
        console.log(error);
        this.restForm.reset();
      })
    }
  }

  getRestaurantInfo() {
    if(this._id !== null) {
      if(this.nameTaste !== null) {
        this.title = "Edit taste";
        this._restaurantService.getRestaurantbyID(this._id).subscribe(data => {
          this.delTastesFromRestaurant(data);
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
            listTags: {
              tagName: data.listTags[0].tagName,
            },
            listDishes: data.listDishes,
          })
        })
      }
      else {
        this.title = "Add taste";
        this._restaurantService.getRestaurantbyID(this._id).subscribe(data => {
          this.delTastesFromRestaurant(data);
          this.restForm.setValue({
            _id: data._id,
            restaurantName: data.restaurantName,
            ownerName: data.owner.ownerName,
            email: data.email,
            address: data.address,
            description: data.description,
            photos: data.photos,
            rating: data.rating,
            listTags: {
              tagName: '',
            },
            creationDate: data.creationDate,
            listDishes: data.listDishes,
          })
        })
      }
    }
  }

  addTastesToRestaurant(rest: Restaurant) {
    if (this.restaurant !== undefined) {
      for (var i = this.restaurant?.listTags.length - 1; i >= 0; i -= 1) {
        if (this.restaurant?.listTags[i].tagName !== this.nameTaste) {
          rest.listTags.push(this.restaurant.listTags[i]);
        }
      }
    }
  }

  delTastesFromRestaurant(rest: Restaurant) {
    if (this._id !== null) {
      for (var i = rest.listTags.length - 1; i >= 0; i -= 1) {
        if (rest.listTags[i].tagName !== this.nameTaste) {
          rest.listTags.splice(i, 1);
        }
      }

      this._restaurantService.getRestaurantbyID(this._id).subscribe(data => {
        this.restaurant = data;
      })
    }
  }

  deleteTaste() {
    if(confirm("Are you sure to delete the taste?")) {
      if (this.nameTaste !== null && this.restaurant !== undefined && this._id !== null) {
        for (var i = this.restaurant.listTags.length - 1; i >= 0; i -= 1) {
          if (this.restaurant.listTags[i].tagName == this.nameTaste) {
            this.restaurant.listTags.splice(i, 1);
          }
        }
        
        this._restaurantService.updateRestaurant(this._id, this.restaurant).subscribe(data => {
          console.log("Taste deleted");
        }, error => {
          console.log(error);
        });
      }
    }
  }
}
