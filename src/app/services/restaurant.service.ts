import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurants';
import { RestaurantADD } from '../models/restaurantsADD';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }
  
  addRestaurant(rest: RestaurantADD): Observable<string> {
    return this.http.post(this.url + '/restaurants', rest, {responseType: 'text'}) ;
  }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url + '/restaurants');
  }

  getRestaurantbyID(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.url + '/restaurants/' + id);
  }

  getRestaurantbyName(name: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.url + '/restaurants/name/' + name);
  }

  updateRestaurant(id: string, rest: Restaurant): Observable<string> {
    return this.http.put(this.url + '/restaurants/' + id, rest, {responseType: 'text'});
  }

  updateRestaurantADD(id: string, rest: RestaurantADD): Observable<string> {
    return this.http.put(this.url + '/restaurants/' + id, rest, {responseType: 'text'});
  }

  deleteRestaurant(id: string): Observable<string> {
    return this.http.delete(this.url + '/restaurants/' + id, {responseType: 'text'})
  }
}
