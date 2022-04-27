import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../models/dish';
import { DishADD } from '../models/dishADD';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  addDish(dish: Dish): Observable<string> {
    return this.http.post(this.url + '/dishes', dish, {responseType: 'text'}) ;
  }

  addDishADD(dish: DishADD): Observable<string> {
    return this.http.post(this.url + '/dishes', dish, {responseType: 'text'}) ;
  }

  getAllDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.url + '/dishes');
  }

  getDishbyID(id: string): Observable<Dish> {
    return this.http.get<Dish>(this.url + '/dishes/' + id);
  }

  updateDish(id: string, dish: Dish): Observable<string> {
    return this.http.put(this.url + '/dishes/' + id, dish, {responseType: 'text'});
  }

  updateDishADD(id: string, dish: DishADD): Observable<string> {
    return this.http.put(this.url + '/dishes/' + id, dish, {responseType: 'text'});
  }

  deleteDish(id: string): Observable<string> {
    return this.http.delete(this.url + '/dishes/' + id, {responseType: 'text'})
  }
}
