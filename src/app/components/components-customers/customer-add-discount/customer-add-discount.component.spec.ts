import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddDiscountComponent } from './customer-add-discount.component';

describe('CustomerAddDiscountComponent', () => {
  let component: CustomerAddDiscountComponent;
  let fixture: ComponentFixture<CustomerAddDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAddDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
