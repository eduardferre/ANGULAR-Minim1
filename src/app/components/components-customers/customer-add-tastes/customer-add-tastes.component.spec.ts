import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddTastesComponent } from './customer-add-tastes.component';

describe('CustomerAddTastesComponent', () => {
  let component: CustomerAddTastesComponent;
  let fixture: ComponentFixture<CustomerAddTastesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAddTastesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddTastesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
