import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-add-discounts',
  templateUrl: './customer-add-discounts.component.html',
  styleUrls: ['./customer-add-discounts.component.css']
})
export class CustomerAddDiscountsComponent implements OnInit {
  customer: Customer | undefined;
  discountForm: FormGroup;
  title = "ADD DISCOUNT";
  nameDisc: string | null;
  amountDisc: string | null;
  _id: string | null;
  _idDisc: string | null;

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
        nameRestaurant: ['', Validators.required],
        amount: ['', Validators.required],
        expirationDate: ['', Validators.required]
      }),
      listReservations: [],
      password: [''],
      creationDate: []
    });

    this.nameDisc = '';
    this.amountDisc = '';

    this._id = this.aRouter.snapshot.paramMap.get('_id');
    console.log(this._id);
    this.nameDisc = this.aRouter.snapshot.paramMap.get('nameDisc');
    console.log(this.nameDisc);
    this.amountDisc = this.aRouter.snapshot.paramMap.get('amountDisc');
    console.log(this.amountDisc);
    this._idDisc = "";

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
      this.addDiscountsToCustomer(customer);
      console.log(customer.listDiscounts);
      this._customerService.updateCustomer(this._id, customer).subscribe(data => {
        this.router.navigate(['/list-customers/', this._id])
      }, error => {
        console.log(error);
        this.discountForm.reset();
      })
    }
  }

  getCustomerInfo() {
    if(this._id !== null) {
      if(this.nameDisc !== null && this.amountDisc !== null) {
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
      else {
        this.title = "add DISCOUNT"
        this._customerService.getCustomerbyID(this._id).subscribe(data => {
          this.delDiscountsFromCustomer(data);
          this.discountForm.setValue({
            _id: data._id,
            customerName: data.customerName,
            fullName: data.fullName,
            email: data.email,
            listTastes: data.listTastes,
            listDiscounts: {
              nameRestaurant: '',
              amount: '',
              expirationDate: '',
            },
            listReservations: data.listReservations,
            password: data.password,
            creationDate: data.creationDate,
          })
        })
      }
    }
  }
  
  addDiscountsToCustomer(cust: Customer) {
    if (this.customer !== undefined) {
      for (var i = this.customer?.listDiscounts.length - 1; i >= 0; i -= 1) {
        if (this.customer?.listDiscounts[i].nameRestaurant !== this.nameDisc && this.customer.listDiscounts[i].amount.toString() !== this.amountDisc) {
          cust.listDiscounts.push(this.customer.listDiscounts[i]);
        }
      }
    }
  }

  delDiscountsFromCustomer(cust: Customer) {
    if (this._id !== null) {
      for (var i = cust.listDiscounts.length - 1; i >= 0; i -= 1) {
        if (cust.listDiscounts[i].nameRestaurant !== this.nameDisc && cust.listDiscounts[i].amount.toString() !== this.amountDisc) {
          cust.listDiscounts.splice(i, 1);
        }
      }

      this._customerService.getCustomerbyID(this._id).subscribe(data => {
        this.customer = data;
      })
    }
  }

  deleteDiscount() {
    if(confirm("Are you sure to delete the discount?")) {
      if (this.nameDisc !== null && this.amountDisc !== null && this.customer !== undefined && this._id !== null) {
        for (var i = this.customer.listDiscounts.length - 1; i >= 0; i -= 1) {
          if (this.customer.listDiscounts[i].nameRestaurant == this.nameDisc && this.customer.listDiscounts[i].amount.toString() == this.amountDisc) {
            this.customer.listDiscounts.splice(i, 1);
            console.log(this.customer.listDiscounts);
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
