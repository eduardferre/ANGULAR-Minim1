import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DishADD } from 'src/app/models/dishADD';
import { Restaurant } from 'src/app/models/restaurants';
import { DishService } from 'src/app/services/dish.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
@Component({
  selector: 'app-restaurant-add-dishes',
  templateUrl: './restaurant-add-dishes.component.html',
  styleUrls: ['./restaurant-add-dishes.component.css']
})
export class RestaurantAddDishesComponent implements OnInit {
  restaurant: Restaurant | undefined;
  restForm: FormGroup;
  title = "ADD dish";
  nameDish: string | null;
  _id: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private _restaurantService: RestaurantService,
              private _dishService: DishService,
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
      listTags: [{ }],
      listDishes: this.fb.group({ 
        _id: [''],
        restaurant: [''],
        title: ['', Validators.required],
        type: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        rating: [''],
      }),
      creationDate: [''],
    });

    this._id = this.aRouter.snapshot.paramMap.get('_id');
    console.log(this._id);
    this.nameDish = this.aRouter.snapshot.paramMap.get('nameDish');
    console.log(this.nameDish);
  }

  ngOnInit(): void {
    this.getRestaurantInfo();
  }

  addDish() {
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

    const dish: DishADD = {
      _id: this.restForm.value.listDishes._id,
      restaurant: restaurant._id,
      title: this.restForm.value.listDishes.title,
      type: this.restForm.value.listDishes.type,
      description: this.restForm.value.listDishes.description,
      price: this.restForm.value.listDishes.price,
      rating: this.restForm.value.listDishes.rating,
    }
    
    if (this._id !== null) {
      if (this.nameDish !== null) {
        console.log(restaurant.listDishes);
        this._dishService.updateDishADD(dish._id, dish).subscribe(data => {
          this.router.navigate(['/list-restaurants/', this._id])
        }, error => {
          console.log(error);
          this.restForm.reset();
        })
      }
      else {
        dish.restaurant = this._id
        console.log(dish);
        this._dishService.addDishADD(dish).subscribe(data => {
          this.router.navigate(['/list-restaurants/', this._id])
        }, error => {
          console.log(error);
          this.restForm.reset();
        })
      }
    }
  }

  getRestaurantInfo() {
    if(this._id !== null) {
      if(this.nameDish !== null) {
        this.title = "Edit dish";
        this._restaurantService.getRestaurantbyID(this._id).subscribe(data => {
          this.delDishesFromRestaurant(data);
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
            listDishes: {
              _id: data.listDishes[0]._id,
              restaurant: data.listDishes[0].restaurant,
              title: data.listDishes[0].title,
              type: data.listDishes[0].type,
              description: data.listDishes[0].description,
              price: data.listDishes[0].price,
              rating: data.listDishes[0].rating,
            },
          })
        })
      }
    }
  }

  addDishesToRestaurant(rest: Restaurant) {
    if (this.restaurant !== undefined) {
      for (var i = this.restaurant?.listDishes.length - 1; i >= 0; i -= 1) {
        if (this.restaurant?.listDishes[i].title !== this.nameDish) {
          rest.listDishes.push(this.restaurant.listDishes[i]);
        }
      }
    }
  }

  delDishesFromRestaurant(rest: Restaurant) {
    if (this._id !== null) {
      for (var i = rest.listDishes.length - 1; i >= 0; i -= 1) {
        if (rest.listDishes[i].title !== this.nameDish) {
          rest.listDishes.splice(i, 1);
        }
      }

      this._restaurantService.getRestaurantbyID(this._id).subscribe(data => {
        this.restaurant = data;
      })
    }
  }

  deleteDish() {
    if(confirm("Are you sure to delete the dish?")) {
      if (this.nameDish !== null && this.restaurant !== undefined && this._id !== null) {
        for (var i = this.restaurant.listDishes.length - 1; i >= 0; i -= 1) {
          if (this.restaurant.listDishes[i].title == this.nameDish) {
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
