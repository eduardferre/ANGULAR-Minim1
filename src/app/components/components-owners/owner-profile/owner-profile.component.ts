import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/models/owners';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.css']
})
export class OwnerProfileComponent implements OnInit {
  owner: Owner | undefined;
  ownerForm: FormGroup;
  title = "Owner Information";
  _id: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private _ownerService: OwnerService,
              private aRouter: ActivatedRoute) { 
    this.ownerForm = this.fb.group({
      _id: ['', Validators.required],
      ownerName: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      listRestaurants: [{
        _id: [],
      }],
      password: ['', Validators.required],
      creationDate: ['', Validators.required],
    });

  this._id = this.aRouter.snapshot.paramMap.get('_id');
  console.log(this._id);
}

  ngOnInit(): void {
    this.getOwnerInfo();
  }

  getOwnerInfo() {
    if(this._id !== null) {
      this._ownerService.getOwnerbyID(this._id).subscribe(data => {
        this.owner = data;
        this.ownerForm.setValue({
          _id: data._id,
          ownerName: data.ownerName,
          fullName: data.fullName,
          email: data.email,
          listRestaurants: data.listRestaurants,
          password: data.password,
          creationDate: data.creationDate,
        })
      })
    }
  }
}
