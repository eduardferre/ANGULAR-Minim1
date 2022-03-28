import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ParsedHostBindings } from '@angular/compiler';
import { Reservation } from '../models/reservations';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  addCustomer(customer: Customer): Observable<string> {
    return this.http.post(this.url + '/customers', customer, {responseType: 'text'}) ;
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url + '/customers');
  }

  getCustomerbyID(id: string): Observable<Customer> {
    return this.http.get<Customer>(this.url + '/customers/' + id);
  }

  getCustomerbyName(name: string): Observable<Customer> {
    return this.http.get<Customer>(this.url + '/customers/name/' + name);
  }

  updateCustomer(id: string, customer: Customer): Observable<string> {
    return this.http.put(this.url + '/customers/' + id, customer, {responseType: 'text'});
  }

  deleteCustomer(id: string): Observable<string> {
    return this.http.delete(this.url + '/customers/' + id, {responseType: 'text'})
  }

  addTastes(id: string, customer: Customer): Observable<string> {
    return this.http.put(this.url + '/customers/tastes/add/' + id, customer, {responseType: 'text'});
  }

  removeTastes(id: string): Observable<string> {
    return this.http.delete(this.url + '/customers/tastes/remove/' + id, {responseType: 'text'});
  }

  addDiscounts(id: string, customer: Customer): Observable<string> {
    return this.http.put(this.url + '/customers/discounts/add/' + id, customer, {responseType: 'text'});
  }

  removeDiscounts(id: string): Observable<string> {
    return this.http.delete(this.url + '/customers/discounts/remove/' + id, {responseType: 'text'});
  }

  addReservation(reservation: Reservation): Observable<string> {
    return this.http.put(this.url + '/reservations', reservation, {responseType: 'text'});
  }

  getReservationbyID(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.url + '/reservations/' + id);
  }

  getReservationbyName(name: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.url + '/reservations/' + name);
  }

  deleteReservation(id: string): Observable<string> {
    return this.http.delete(this.url + '/reservations/' + id, {responseType: 'text'});
  }

}
