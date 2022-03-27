import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersAddRestaurantsComponent } from './owners-add-restaurants.component';

describe('OwnersAddRestaurantsComponent', () => {
  let component: OwnersAddRestaurantsComponent;
  let fixture: ComponentFixture<OwnersAddRestaurantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnersAddRestaurantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnersAddRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
