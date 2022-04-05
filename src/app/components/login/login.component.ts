import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  customer: Customer | undefined;
  loginForm: FormGroup;
  title = "login";

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private toastr: ToastrService,
              private _authService: AuthService,
              private aRouter: ActivatedRoute) { 
    this.loginForm = this.fb.group({
      _id: [],
      customerName: [''],
      fullName: [''],
      email: ['', [Validators.required, Validators.email]],
      listTastes: [{
        tagName: [],
        relevance: [],
      }],
      listDiscounts: [],
      listReservations: [],
      password: ['', Validators.required],
      creationDate: [],
    });
}
  ngOnInit(): void {
    }

  loginCustomer() {
    const customer: Customer = {
      _id: this.loginForm.get('_id')?.value,
      customerName: this.loginForm.get('customerName')?.value,
      fullName: this.loginForm.get('fullName')?.value,
      email: this.loginForm.get('email')?.value,
      listTastes: this.loginForm.get('listTastes')?.value,
      listDiscounts: this.loginForm.get('listDiscounts')?.value,
      listReservations: this.loginForm.get('listReservations')?.value,
      password: this.loginForm.get('password')?.value,
      creationDate: this.loginForm.get('creationDate')?.value,
    }
    
    this._authService.loginCustomer(customer).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res);      
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error);
      this.loginForm.reset();
    })
  }
}
