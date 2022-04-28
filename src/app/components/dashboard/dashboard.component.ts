import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Denuncia } from 'src/app/models/denuncia';
import { DenunciaService } from 'src/app/services/denuncia.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listDenuncias: Denuncia[] = [];

  constructor(private _denunciaService: DenunciaService,
              private _restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.getAllDenuncias();
  }


  getAllDenuncias() {
    this._denunciaService.getAllDenuncias().subscribe(data => {
      console.log(data);
      this.listDenuncias = data;
    }, error => {
      console.log(error);
    })
  }
}
