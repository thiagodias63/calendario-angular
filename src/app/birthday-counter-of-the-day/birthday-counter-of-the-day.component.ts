import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-birthday-counter-of-the-day',
  templateUrl: './birthday-counter-of-the-day.component.html',
  styleUrls: ['./birthday-counter-of-the-day.component.css']
})
export class BirthdayCounterOfTheDayComponent implements OnInit {

  @Input() birthDays: any[] = [];
  @Input() day: number = 0;
  @Input() month: number = 0;
  counter: number = 0;
  counterToShow: string = '';

  ngOnInit(): void {
    this.counter = this.birthDays.filter((birthDay) => {
      return birthDay.day === this.day && birthDay.month === this.month
    }).length;
    this.counterToShow = this.counter < 10 ? `0${this.counter}` : this.counter.toString();
  }

}
