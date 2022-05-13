import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomOverviewCardComponent } from './room-overview-card.component';

describe('RoomOverviewCardComponent', () => {
  let component: RoomOverviewCardComponent;
  let fixture: ComponentFixture<RoomOverviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomOverviewCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomOverviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
