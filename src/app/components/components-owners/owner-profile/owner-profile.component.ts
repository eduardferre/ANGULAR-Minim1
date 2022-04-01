import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/models/owners';
import { OwnerService } from 'src/app/services/owner.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.css']
})
export class OwnerProfileComponent implements OnInit {
  owner: Owner | undefined;
  restaurants: [string] | undefined;
  title = "Owner Information";
  _id: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private _ownerService: OwnerService,
              private _restaurantService: RestaurantService,
              private aRouter: ActivatedRoute) {

  this._id = this.aRouter.snapshot.paramMap.get('_id');
  console.log(this._id);
}

  ngOnInit(): void {
    this.getOwnerInfo();
  }

  getOwnerInfo() {
    if(this._id !== null) {
      let namerest: string;

      this._ownerService.getOwnerbyID(this._id).subscribe(data => {
        this.owner = data;
        this.restaurants = [''];
        this.restaurants.pop();
       
        data.listRestaurants.forEach(rest => {
          this._restaurantService.getRestaurantbyID(rest._id).subscribe(data => {
            namerest = data.restaurantName;
            this.restaurants?.push(namerest);
          })
        })
        console.log(this.restaurants);
      })
    }
  }
}
