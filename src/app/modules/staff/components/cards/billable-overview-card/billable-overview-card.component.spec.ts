import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillableOverviewCardComponent } from './billable-overview-card.component';

describe('BillableOverviewCardComponent', () => {
  let component: BillableOverviewCardComponent;
  let fixture: ComponentFixture<BillableOverviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillableOverviewCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillableOverviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
