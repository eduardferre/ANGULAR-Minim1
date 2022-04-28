import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciasEditComponent } from './denuncias-edit.component';

describe('DenunciasEditComponent', () => {
  let component: DenunciasEditComponent;
  let fixture: ComponentFixture<DenunciasEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenunciasEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DenunciasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
