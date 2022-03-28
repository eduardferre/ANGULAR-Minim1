import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurants';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }
  
  addRestaurant() {

  }

  getAllRestaurants() {

  }

  getRestaurantbyID(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.url + '/restaurants/' + id);
  }

  getRestaurantbyName() {

  }

  updateRestaurant() {

  }

  deleteRestaurant() {

  }
}
