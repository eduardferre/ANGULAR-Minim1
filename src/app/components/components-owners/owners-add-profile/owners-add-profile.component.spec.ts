import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersAddProfileComponent } from './owners-add-profile.component';

describe('OwnersAddProfileComponent', () => {
  let component: OwnersAddProfileComponent;
  let fixture: ComponentFixture<OwnersAddProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnersAddProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnersAddProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
