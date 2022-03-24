import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddReservationsComponent } from './customer-add-reservations.component';

describe('CustomerAddReservationsComponent', () => {
  let component: CustomerAddReservationsComponent;
  let fixture: ComponentFixture<CustomerAddReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAddReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
