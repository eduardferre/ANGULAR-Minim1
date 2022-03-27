import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-add-discount',
  templateUrl: './customer-add-discount.component.html',
  styleUrls: ['./customer-add-discount.component.css']
})
export class CustomerAddDiscountComponent implements OnInit {
  customer: Customer | undefined;
  discountForm: FormGroup;
  title = "ADD DISCOUNT";
  _iddiscount: string | null;
  _id: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private _customerService: CustomerService,
              private aRouter: ActivatedRoute) { 
    this.discountForm = this.fb.group({
      _id: [''],
      customerName: [''],
      fullName: [''],
      email: [''],
      listTastes: [''],
      listDiscounts: this.fb.group({
        _id: [''],
        nameRestaurant: ['', Validators.required],
        amount: ['', Validators.required],
        expirationDate: ['', Validators.required]
      }),
      listReservations: [],
      password: [''],
      creationDate: []
    });


    this._id = this.aRouter.snapshot.paramMap.get('_id');
    console.log(this._id);
    this._iddiscount = this.aRouter.snapshot.paramMap.get('_iddiscount');
    console.log(this._iddiscount);
  }

  ngOnInit(): void {
    this.getCustomerInfo();
  }


  addDiscount() {
    const customer: Customer = {
      _id: this.discountForm.get('_id')?.value,
      customerName: this.discountForm.get('customerName')?.value,
      fullName: this.discountForm.get('fullName')?.value,
      email: this.discountForm.get('email')?.value,
      listDiscounts: [{
        _id: this.discountForm.value.listDiscounts._id,
        nameRestaurant: this.discountForm.value.listDiscounts.nameRestaurant,
        amount: this.discountForm.value.listDiscounts.amount,
        expirationDate: this.discountForm.value.listDiscounts.expirationDate,
      }],
      listTastes: this.discountForm.get('listTastes')?.value,
      listReservations: this.discountForm.get('listReservations')?.value,
      password: this.discountForm.get('password')?.value,
      creationDate: this.discountForm.get('creationDate')?.value,
    }
    
    if (this._id !== null) {
      if (this._iddiscount !== null) {
        this.addDiscountsToCustomer(customer);
        this._customerService.updateCustomer(this._id, customer).subscribe(data => {
          this.router.navigate(['/list-customers/', this._id])
        }, error => {
          console.log(error);
          this.discountForm.reset();
        })
      }

      else {
        console.log(customer.listTastes);
        this._customerService.addDiscounts(this._id, customer).subscribe(data => {
          this.router.navigate(['/list-customers/', this._id]);
        }, error => {
          console.log(error);
          this.discountForm.reset();
        })
      }
    }
  }

  getCustomerInfo() {
    if(this.customer == undefined && this._iddiscount !== null && this._id !== null) {
      this.title = "EDIT DISCOUNT"
      this._customerService.getCustomerbyID(this._id).subscribe(data => {
        this.delDiscountsFromCustomer(data);
        this.discountForm.setValue({
          _id: data._id,
          customerName: data.customerName,
          fullName: data.fullName,
          email: data.email,
          listTastes: data.listTastes,
          listDiscounts: {
            _id: data.listDiscounts[0]._id,
            nameRestaurant: data.listDiscounts[0].nameRestaurant,
            amount: data.listDiscounts[0].amount,
            expirationDate: data.listDiscounts[0].expirationDate
          },
          listReservations: data.listReservations,
          password: data.password,
          creationDate: data.creationDate,
        })
      })
    }
  }
  
  addDiscountsToCustomer(cust: Customer) {
    if (this.customer !== undefined) {
      for (var i = this.customer?.listDiscounts.length - 1; i >= 0; i -= 1) {
        if (this.customer?.listDiscounts[i]._id !== this._iddiscount) {
          cust.listDiscounts.push(this.customer.listDiscounts[i]);
        }
      }
    }
  }

  delDiscountsFromCustomer(cust: Customer) {
    if (this._id !== null) {
      for (var i = cust.listDiscounts.length - 1; i >= 0; i -= 1) {
        if (cust.listDiscounts[i]._id !== this._iddiscount) {
          cust.listDiscounts.splice(i, 1);
        }
      }

      this._customerService.getCustomerbyID(this._id).subscribe(data => {
        this.customer = data;
      })
    }
  }

  deleteDiscount() {
    if(confirm("Are you sure to delete the taste?")) {
      if (this._iddiscount !== null && this.customer !== undefined && this._id !== null) {
        for (var i = this.customer.listDiscounts.length - 1; i >= 0; i -= 1) {
          if (this.customer.listDiscounts[i]._id == this._iddiscount) {
            this.customer.listDiscounts.splice(i, 1);
          }
        }

        this._customerService.updateCustomer(this._id, this.customer).subscribe(data => {
          console.log("Discount deleted");
        }, error => {
          console.log(error);
        });
      }
    }
  }
}
