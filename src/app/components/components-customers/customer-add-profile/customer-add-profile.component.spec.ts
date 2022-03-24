import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddProfileComponent } from './customer-add-profile.component';

describe('CustomerAddProfileComponent', () => {
  let component: CustomerAddProfileComponent;
  let fixture: ComponentFixture<CustomerAddProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAddProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
