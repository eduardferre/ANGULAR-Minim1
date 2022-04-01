import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurants';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-profile',
  templateUrl: './restaurant-profile.component.html',
  styleUrls: ['./restaurant-profile.component.css']
})
export class RestaurantProfileComponent implements OnInit {
  rest: Restaurant | undefined;
  restaurantForm: FormGroup;
  title = "Restaurant Information";
  _id: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private _restaurantService: RestaurantService,
              private aRouter: ActivatedRoute) { 
    this.restaurantForm = this.fb.group({
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
      listMenus: [{ }],
      creationDate: ['', Validators.required],
    });

  this._id = this.aRouter.snapshot.paramMap.get('_id');
  console.log(this._id);
}

  ngOnInit(): void {
    this.getRestaurantInfo();
  }

  getRestaurantInfo() {
    if(this._id !== null) {
      this._restaurantService.getRestaurantbyID(this._id).subscribe(data => {
        this.rest = data;
        this.restaurantForm.setValue({
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
          listMenus: data.listMenus,
        })
      })
    }
  }
}
