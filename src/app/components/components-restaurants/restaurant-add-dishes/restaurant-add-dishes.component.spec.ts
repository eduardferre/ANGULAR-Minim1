import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantAddDishesComponent } from './restaurant-add-dishes.component';

describe('RestaurantAddDishesComponent', () => {
  let component: RestaurantAddDishesComponent;
  let fixture: ComponentFixture<RestaurantAddDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantAddDishesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantAddDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
