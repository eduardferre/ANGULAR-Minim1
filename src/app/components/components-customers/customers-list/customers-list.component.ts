import { Component, OnInit } from '@angular/core';
import { Toast, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  listCustomers: Customer[] = [];

  constructor(private _customerService: CustomerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }


  getAllCustomers() {
    this._customerService.getAllCustomers().subscribe(data => {
      console.log(data);
      this.listCustomers = data;
    }, error => {
      console.log(error);
    })
  }
}
