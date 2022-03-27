import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/models/owners';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.css']
})
export class OwnersListComponent implements OnInit {
  listOwners: Owner[] = [];

  constructor(private _ownerService: OwnerService) { }

  ngOnInit(): void {
    this.getAllOwners();
  }


  getAllOwners() {
    this._ownerService.getAllOwners().subscribe(data => {
      console.log(data);
      this.listOwners = data;
    }, error => {
      console.log(error);
    })
  }
}
