import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurants';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})
export class RestaurantsListComponent implements OnInit {
  listRestaurants: Restaurant[] = [];

  constructor(private _restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this._restaurantService.getAllRestaurants().subscribe(data => {
      console.log(data);
      this.listRestaurants = data;
    }, error => {
      console.log(error);
    })
  }
}
