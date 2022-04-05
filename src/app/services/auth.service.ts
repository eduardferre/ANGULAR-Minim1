import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api';
  constructor(private http: HttpClient, private router: Router) { }

  loginCustomer(customer: Customer): Observable<string> {
    return this.http.post(this.URL + '/customers/login', customer , {responseType: 'text'});
  }
  getToken() {
    const token = localStorage.getItem('token');
    console.log(token);
    return token;
  }  

  loggedIn(): Boolean {
    return !!localStorage.getItem('token');
  }
  
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}