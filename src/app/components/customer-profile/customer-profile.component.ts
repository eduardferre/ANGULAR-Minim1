import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  customerForm: FormGroup;
  title = "User information";
  _id: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private toastr: ToastrService,
              private _customerService: CustomerService,
              private aRouter: ActivatedRoute) { 
    this.customerForm = this.fb.group({
      _id: ['', Validators.required],
      customerName: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      listTastes: [],
      listDiscounts: [],
      listReservations: [],
      password: ['', Validators.required],
      creationDate: ['', Validators.required],
    });

  this._id = this.aRouter.snapshot.paramMap.get('_id');
  console.log(this._id);
}

  ngOnInit(): void {
    this.getCustomerInfo();
  }

  updateCustomer() {
    const customer: Customer = {
      _id: this.customerForm.get('_id')?.value,
      customerName: this.customerForm.get('customerName')?.value,
      fullName: this.customerForm.get('fullName')?.value,
      email: this.customerForm.get('email')?.value,
      listTastes: this.customerForm.get('listTastes')?.value,
      listDiscounts: this.customerForm.get('listDiscounts')?.value,
      listReservations: this.customerForm.get('listReservations')?.value,
      password: this.customerForm.get('password')?.value,
      creationDate: this.customerForm.get('creationDate')?.value,
    }
    
    if (this._id !== null) {
      this._customerService.updateCustomer(this._id, customer).subscribe(data => {
        this.toastr.info('El user ha estat editat amb exit!', 'Customer Canviat');
        this.router.navigate(['/list-customers']);
      }, error => {
        console.log(error);
        this.customerForm.reset();
      })
    }
  }

  getCustomerInfo() {
    if(this._id !== null) {
      this._customerService.getCustomerbyID(this._id).subscribe(data => {
        this.customerForm.setValue({
          _id: data._id,
          customerName: data.customerName,
          fullName: data.fullName,
          email: data.email,
          listTastes: data.listTastes,
          listDiscounts: data.listDiscounts,
          listReservations: data.listReservations,
          password: data.password,
          creationDate: data.creationDate,
        })
      })
    }
  }
}
