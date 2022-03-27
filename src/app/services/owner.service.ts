import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Owner } from '../models/owners';
import { ParsedHostBindings } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  addOwner(owner: Owner): Observable<string> {
    return this.http.post(this.url + '/owners', owner, {responseType: 'text'}) ;
  }

  getAllOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.url + '/owners');
  }

  getOwnerbyID(id: string): Observable<Owner> {
    return this.http.get<Owner>(this.url + '/owners/' + id);
  }

  getOwnerbyName(name: string): Observable<Owner> {
    return this.http.get<Owner>(this.url + '/owners/name/' + name);
  }

  updateOwner(name: string, owner: Owner): Observable<string> {
    return this.http.put(this.url + '/owners/' + name, owner, {responseType: 'text'});
  }

  deleteOwner(id: string): Observable<string> {
    return this.http.delete(this.url + '/owners/' + id, {responseType: 'text'})
  }
}
