import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantAddTastesComponent } from './restaurant-add-tastes.component';

describe('RestaurantAddTastesComponent', () => {
  let component: RestaurantAddTastesComponent;
  let fixture: ComponentFixture<RestaurantAddTastesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantAddTastesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantAddTastesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
