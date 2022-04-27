import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddDiscountsComponent } from './customer-add-discounts.component';

describe('CustomerAddDiscountsComponent', () => {
  let component: CustomerAddDiscountsComponent;
  let fixture: ComponentFixture<CustomerAddDiscountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAddDiscountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
