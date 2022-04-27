import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAuthenticationComponent } from './staff-authentication.component';

describe('StaffAuthenticationComponent', () => {
  let component: StaffAuthenticationComponent;
  let fixture: ComponentFixture<StaffAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffAuthenticationComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
