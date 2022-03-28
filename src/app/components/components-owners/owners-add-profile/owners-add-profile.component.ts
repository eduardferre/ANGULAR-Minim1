import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/models/owners';
import { OwnerService } from 'src/app/services/owner.service';
@Component({
  selector: 'app-owners-add-profile',
  templateUrl: './owners-add-profile.component.html',
  styleUrls: ['./owners-add-profile.component.css']
})
export class OwnersAddProfileComponent implements OnInit {
  owner: Owner | undefined;
  ownerForm: FormGroup;
  title = "Owner Information";
  _id: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private _ownerService: OwnerService,
              private aRouter: ActivatedRoute) { 
    this.ownerForm = this.fb.group({
      _id: [''],
      ownerName: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      listRestaurants: [{
        _id: [],
      }],
      password: ['', Validators.required],
      creationDate: [''],
    });

    this._id = this.aRouter.snapshot.paramMap.get('_id');
    console.log(this._id);
  }

  ngOnInit(): void {
    this.getOwnerInfo();
  }

  addOwner() {
    const owner: Owner = {
      _id: this.ownerForm.get('_id')?.value,
      ownerName: this.ownerForm.get('ownerName')?.value,
      fullName: this.ownerForm.get('fullName')?.value,
      email: this.ownerForm.get('email')?.value,
      listRestaurants: this.ownerForm.get('listRestaurants')?.value,
      password: this.ownerForm.get('password')?.value,
      creationDate: this.ownerForm.get('creationDate')?.value,
    }
    
    if (this._id !== 'add-owner' && this._id !== null) {
      this._ownerService.updateOwner(owner.ownerName, owner).subscribe(data => {
        this.router.navigate(['/list-owners/', owner._id])
      }, error => {
        console.log(error);
        this.ownerForm.reset();
      })
    }

    else {
      console.log(owner);
      this._ownerService.addOwner(owner).subscribe(data => {
        this.router.navigate(['/list-owners']);
      }, error => {
        console.log(error);
        this.ownerForm.reset();
      })
    }
  }

  getOwnerInfo() {
    if(this._id !== null) {
      this.title = "Editable Information";
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

  deleteOwner() {
    if(confirm("Are you sure to delete the owner?")) {
      if (this._id !== null) {
        this._ownerService.deleteOwner(this._id).subscribe(data => {
          console.log("User deleted");
          this.router.navigate(['/list-owners']);
        }, error => {
          console.log(error);
        });
      }
    }
    else {
      this.router.navigate(['/list-owners', this._id]);
    }
  }
}
