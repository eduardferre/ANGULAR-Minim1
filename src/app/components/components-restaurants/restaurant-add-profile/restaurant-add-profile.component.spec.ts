import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantAddProfileComponent } from './restaurant-add-profile.component';

describe('RestaurantAddProfileComponent', () => {
  let component: RestaurantAddProfileComponent;
  let fixture: ComponentFixture<RestaurantAddProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantAddProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantAddProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
