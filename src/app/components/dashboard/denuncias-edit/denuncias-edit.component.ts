import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { Denuncia } from 'src/app/models/denuncia';
import { DenunciaADD } from 'src/app/models/denunciaADD';
import { CustomerService } from 'src/app/services/customer.service';
import { DenunciaService } from 'src/app/services/denuncia.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-denuncias-edit',
  templateUrl: './denuncias-edit.component.html',
  styleUrls: ['./denuncias-edit.component.css']
})
export class DenunciasEditComponent implements OnInit {
  denuncia: Denuncia | undefined;
  denunciaForm: FormGroup;
  title = "NEW DENUNCIA";
  _id: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private toastr: ToastrService,
              private _denunciaService: DenunciaService,
              private _restaurantService: RestaurantService,
              private aRouter: ActivatedRoute) { 
    this.denunciaForm = this.fb.group({
      _id: [],
      restaurant: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required],
      denunciaDate: [ ],
    });

  this._id = this.aRouter.snapshot.paramMap.get('_id');
  console.log(this._id);
}

  ngOnInit(): void {
    this.getDenunciaInfo();
  }

  addDenuncia() {
    const denuncia: DenunciaADD = {
      _id: this.denunciaForm.get('_id')?.value,
      restaurant: this.denunciaForm.get('restaurant')?.value,
      description: this.denunciaForm.get('description')?.value,
      amount: this.denunciaForm.get('amount')?.value,
      denunciaDate: this.denunciaForm.get('denunciaDate')?.value,
    }
    
    if (this._id !== 'add-denuncia' && this._id !== null) {
      this._denunciaService.updateDenuncia(this._id, denuncia).subscribe(data => {
        this.router.navigate(['/', denuncia._id])
      }, error => {
        console.log(error);
        this.denunciaForm.reset();
      })
    }

    else {
      console.log(denuncia);
      
      this._restaurantService.getRestaurantbyName(denuncia.restaurant).subscribe(data => {
        denuncia.restaurant = data._id;
        this._denunciaService.addDenuncia(denuncia).subscribe(data => {
          this.router.navigate(['/']);
        }, error => {
          console.log(error);
          this.denunciaForm.reset();
        })
      }) 
    }
  }

  getDenunciaInfo() {
    if(this._id !== 'add-denuncia' && this._id !== null) {
      this.title = "EDITABLE INFORMATION"
      this._denunciaService.getDenunciaByID(this._id).subscribe(data => {
        this.denuncia = data;
        this.denunciaForm.setValue({
          _id: data._id,
          restaurant: data.restaurant._id,
          description: data.description,
          amount: data.amount,
          denunciaDate: data.denunciaDate,
        })
      })
    }
  }

  deleteDenuncia() {
    if(confirm("Are you sure to delete the denuncia?")) {
      if (this._id !== null) {
        this._denunciaService.deleteDenuncia(this._id).subscribe(data => {
          console.log("Denuncia deleted");
        }, error => {
          console.log(error);
        });
      }
    }
    else {
      this.router.navigate(['/', this._id]);
    }
  }
}

