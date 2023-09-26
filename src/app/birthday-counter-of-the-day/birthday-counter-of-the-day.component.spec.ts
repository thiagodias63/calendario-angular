import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayCounterOfTheDayComponent } from './birthday-counter-of-the-day.component';

describe('BirthdayCounterOfTheDayComponent', () => {
  let component: BirthdayCounterOfTheDayComponent;
  let fixture: ComponentFixture<BirthdayCounterOfTheDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthdayCounterOfTheDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirthdayCounterOfTheDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
