import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ParsedHostBindings } from '@angular/compiler';
import { Reservation } from '../models/reservations';
import { Denuncia } from '../models/denuncia';
import { DenunciaADD } from '../models/denunciaADD';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {
  url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  addDenuncia(denuncia: DenunciaADD): Observable<string> {
    return this.http.post(this.url + '/denuncias', denuncia, {responseType: 'text'}) ;
  }

  getAllDenuncias(): Observable<Denuncia[]> {
    return this.http.get<Denuncia[]>(this.url + '/denuncias');
  }

  getDenunciaByID(id: string): Observable<Denuncia> {
    return this.http.get<Denuncia>(this.url + '/denuncias/' + id);
  }

  updateDenuncia(id: string, denuncia: DenunciaADD): Observable<string> {
    return this.http.put(this.url + '/denuncias/' + id, denuncia, {responseType: 'text'});
  }

  deleteDenuncia(id: string): Observable<string> {
    return this.http.delete(this.url + '/denuncias/' + id, {responseType: 'text'})
  }
}

